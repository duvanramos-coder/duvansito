/**
 * PEOPLE BPO - Dashboard Ejecutivo
 * @author Duvan Ramos
 * @version 5.0
 */

const SPREADSHEET_ID = "1-q8bNXPWWRRe19vfcJgIFOQGzZSW1a8WbNFgjasECMU";

function doGet() {
  try {
    return HtmlService.createTemplateFromFile("index").evaluate()
      .setTitle("Dashboard Pro - People BPO")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  } catch (e) {
    return HtmlService.createHtmlOutput("Error crítico al cargar el dashboard: " + e.toString());
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* ===================== */
/* OBTENER USUARIOS */
/* ===================== */

function obtenerUsuarios() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName("Funcionarios");
    if (!sheet) throw new Error("Hoja 'Funcionarios' no encontrada");

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return [];

    // Obtener solo la primera columna (Usuarios)
    const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    return values
      .map(row => (row[0] || "").toString().trim())
      .filter(Boolean)
      .sort();
  } catch (e) {
    console.error("Error en obtenerUsuarios:", e.toString());
    return [];
  }
}

/* ===================== */
/* LOGIN */
/* ===================== */

function login(usuario, password) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetUsers = ss.getSheetByName("Funcionarios");
    const lastRow = sheetUsers.getLastRow();
    if (lastRow < 1) return "ERROR";

    const users = sheetUsers.getRange(1, 1, lastRow, 5).getValues();
    for (let i = 1; i < users.length; i++) {
      // users[i][0] = Usuario, users[i][3] = Password, users[i][4] = Nombre
      if (usuario.toString().trim() === users[i][0].toString().trim() &&
          password.toString() === users[i][3].toString()) {

        let datos = obtenerMetricasConSS(ss, users[i][0]);
        datos.nombre = users[i][4];
        return datos;
      }
    }
  } catch (e) {
    console.error("Error en login:", e.toString());
  }
  return "ERROR";
}

/* ===================== */
/* MÉTRICAS DASHBOARD */
/* ===================== */

function obtenerMetricas(asesor) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return obtenerMetricasConSS(ss, asesor);
}

function obtenerMetricasConSS(ss, asesor) {
  const asesorBuscado = (asesor || "").toString().trim().toUpperCase();

  const toSheet = ss.getSheetByName("TO");
  const dataTO = toSheet ? toSheet.getDataRange().getValues() : [];

  const consolidadoSheet = ss.getSheetByName("Consolidado");
  const consolidadoData = consolidadoSheet ? consolidadoSheet.getDataRange().getValues() : [];

  let metrics = [];
  let area = "";
  let bonoGanado = 0;
  let rowUser = null;

  for (let i = 1; i < dataTO.length; i++) {
    if ((dataTO[i][0] || "").toString().trim().toUpperCase() === asesorBuscado) {
      rowUser = dataTO[i];
      area = String(rowUser[5]).trim() === "G. Empleo Cofrem" ? "G. Empleo Cofrem" : (rowUser[2] || "").toString().trim();
      break;
    }
  }

  if (rowUser) {
    const fmtPct = (val) => {
      if (typeof val === "number") return (val * 100).toFixed(1) + "%";
      if (typeof val === "string" && val.includes("%")) return val;
      return (val || 0).toString();
    };

    const getVal = (idx) => rowUser[idx] || 0;

    if (area === "G. Empleo Cofrem") {
      metrics.push({ label: "PEC", value: fmtPct(getVal(2)) });
      metrics.push({ label: "PENC", value: fmtPct(getVal(3)) });
      metrics.push({ label: "Auditorías", value: getVal(4) });
      bonoGanado = 0;
    } else if (area === "Linea amiga - Caja" || area === "Chat") {
      metrics.push({ label: "Satisfacción", value: fmtPct(getVal(4)) });
      metrics.push({ label: "PEC", value: fmtPct(getVal(5)) });
      metrics.push({ label: "PENC", value: fmtPct(getVal(6)) });
      metrics.push({ label: "Productividad", value: fmtPct(getVal(7)) });
      metrics.push({ label: "Adherencia", value: fmtPct(getVal(8)) });
      metrics.push({ label: "PQRSF Creados", value: getVal(10) });
      metrics.push({ label: "PQRSF Devueltos", value: getVal(11) });
      metrics.push({ label: "Auditorías", value: getVal(12) });
      bonoGanado = parseBono(getVal(9));
    } else if (area === "G. Empleo") {
      metrics.push({ label: "Satisfacción", value: fmtPct(getVal(4)) });
      metrics.push({ label: "PEC", value: fmtPct(getVal(5)) });
      metrics.push({ label: "PENC", value: fmtPct(getVal(6)) });
      metrics.push({ label: "Productividad", value: fmtPct(getVal(7)) });
      metrics.push({ label: "Adherencia", value: fmtPct(getVal(8)) });
      bonoGanado = parseBono(getVal(9));
    } else if (area === "Encuestas") {
      metrics.push({ label: "Calidad de la llamada", value: fmtPct(getVal(4)) });
      metrics.push({ label: "PEC", value: fmtPct(getVal(5)) });
      metrics.push({ label: "PENC", value: fmtPct(getVal(6)) });
      metrics.push({ label: "Productividad", value: fmtPct(getVal(7)) });
      metrics.push({ label: "Adherencia", value: fmtPct(getVal(8)) });
      metrics.push({ label: "Precisión Ortográfica", value: fmtPct(getVal(9)) });
      metrics.push({ label: "Error de Respuesta", value: getVal(10) });
      bonoGanado = parseBono(getVal(11));
    } else if (area === "Radicacion") {
      metrics.push({ label: "Productividad", value: fmtPct(getVal(4)) });
      metrics.push({ label: "Radicados", value: fmtPct(getVal(5)) });
      metrics.push({ label: "SNC", value: fmtPct(getVal(6)) });
      metrics.push({ label: "Precisión Ortográfica", value: fmtPct(getVal(7)) });
      metrics.push({ label: "Adherencia", value: fmtPct(getVal(8)) });
      metrics.push({ label: "SNC Recibidos", value: getVal(10) });
      metrics.push({ label: "Cant. Radicados", value: getVal(11) });
      metrics.push({ label: "Por Corrección", value: getVal(12) });
      metrics.push({ label: "SNC Solucionados", value: getVal(13) });
      bonoGanado = parseBono(getVal(9));
    }
  }

  const tz = ss.getSpreadsheetTimeZone();

  const auditorias = [];
  for (let i = 1; i < consolidadoData.length; i++) {
    const row = consolidadoData[i];
    const asesorRow = (row[2] || "").toString().trim().toUpperCase();
    if (asesorRow !== asesorBuscado) continue;

    const fechaRaw = row[0];
    auditorias.push({
      fecha: fechaRaw instanceof Date ? Utilities.formatDate(fechaRaw, tz, "dd-MM-yyyy HH:mm") : (fechaRaw || ""),
      mes: row[1] || "",
      asesor: row[2] || "",
      canal: row[3] || "",
      tipoGestion: row[4] || "",
      idGestion: row[6] || "",
      evaluador: row[7] || "",
      puntosMejora: row[20] || "",
      timestamp: fechaRaw instanceof Date ? fechaRaw.getTime() : 0
    });
  }

  auditorias.sort((a, b) => b.timestamp - a.timestamp);

  const tablaData = auditorias.slice(0, 10).map(a => {
    const { timestamp, ...rest } = a;
    return rest;
  });

  const historialBono = obtenerHistorialBonos(ss, asesorBuscado);

  return {
    asesor: asesor,
    area: area,
    metrics: metrics,
    tablaData: tablaData,
    bonoGanado: bonoGanado,
    historialBono: historialBono
  };
}

function obtenerHistorialBonos(ss, asesorBuscado) {
  try {
    const sheet = ss.getSheetByName("Historial_bonos");
    if (!sheet) return [];

    const data = sheet.getDataRange().getValues();
    const tz = ss.getSpreadsheetTimeZone();

    return data
      .slice(1)
      .filter(row => (row[0] || "").toString().trim().toUpperCase() === asesorBuscado)
      .map(row => {
        const fechaRaw = row[1];
        return {
          fecha: fechaRaw instanceof Date ? Utilities.formatDate(fechaRaw, tz, "MMMM yyyy") : fechaRaw.toString(),
          monto: parseBono(row[2]),
          estado: row[3] || ""
        };
      });
  } catch (e) {
    return [];
  }
}

function parseBono(val) {
  if (!val) return 0;
  return Number(typeof val === "string" ? val.replace(/[^\d]/g, "") : val) || 0;
}
