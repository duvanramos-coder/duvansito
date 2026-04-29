function doGet() {
  try {
    return HtmlService.createTemplateFromFile("index").evaluate()
      .setTitle("Dashboard Pro - People BPO")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (e) {
    return HtmlService.createHtmlOutput("Error al cargar el dashboard: " + e.toString());
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
    const ss = SpreadsheetApp.openById("1-q8bNXPWWRRe19vfcJgIFOQGzZSW1a8WbNFgjasECMU");
    const sheet = ss.getSheetByName("Funcionarios");
    if (!sheet) {
      console.error("No se encontró la hoja 'Funcionarios'");
      return [];
    }
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return [];
    return sheet.getRange(2, 1, lastRow - 1, 1).getValues()
      .map(function(row) { return (row[0] || "").toString().trim(); })
      .filter(Boolean);
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
    const ss = SpreadsheetApp.openById("1-q8bNXPWWRRe19vfcJgIFOQGzZSW1a8WbNFgjasECMU");
    const sheetUsers = ss.getSheetByName("Funcionarios");
    const lastRow = sheetUsers.getLastRow();
    if (lastRow < 1) return "ERROR";
    const users = sheetUsers.getRange(1, 1, lastRow, 5).getValues();
    for (let i = 1; i < users.length; i++) {
      if (usuario == users[i][0] && password == users[i][3]) {
        let datos = obtenerMetricasConSS(ss, users[i][0]);
        datos.nombre = users[i][4];
        return datos;
      }
    }
  } catch (e) {}
  return "ERROR";
}

/* ===================== */
/* MÉTRICAS DASHBOARD (Optimizado) */
/* ===================== */

function obtenerMetricas(asesor) {
  const ss = SpreadsheetApp.openById("1-q8bNXPWWRRe19vfcJgIFOQGzZSW1a8WbNFgjasECMU");
  return obtenerMetricasConSS(ss, asesor);
}

function obtenerMetricasConSS(ss, asesor) {
  const asesorBuscado = (asesor || "").toString().trim().toUpperCase();

  const toSheet = ss.getSheetByName("TO");
  const lastRowTO = toSheet.getLastRow();
  const dataTO = lastRowTO > 1 ? toSheet.getRange(1, 1, lastRowTO, 16).getValues() : [];

  const consolidadoSheet = ss.getSheetByName("Consolidado");
  const lastRowConsolidado = consolidadoSheet ? consolidadoSheet.getLastRow() : 0;
  const consolidadoData = lastRowConsolidado > 1
    ? consolidadoSheet.getRange(1, 1, lastRowConsolidado, 21).getValues()
    : [];

  let metrics = [];
  let area = "";
  let bonoGanado = 0;
  let rowUser = null;

  for (let i = 1; i < dataTO.length; i++) {
    if ((dataTO[i][0] || "").toString().trim().toUpperCase() === asesorBuscado) {
      rowUser = dataTO[i];
      if (String(rowUser[5]).trim() === "G. Empleo Cofrem") {
        area = "G. Empleo Cofrem";
      } else {
        area = (rowUser[2] || "").toString().trim();
      }
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

  // Hoja Consolidado (columnas clave):
  // A Fecha, B Mes, C Asesor, D Canal, E Tipo de gestión, G ID Gestión, H Evaluador, U Puntos de mejora
  const auditorias = [];
  for (let i = 1; i < consolidadoData.length; i++) {
    const row = consolidadoData[i];
    const asesorRow = (row[2] || "").toString().trim().toUpperCase(); // C
    if (asesorRow !== asesorBuscado) continue;

    const fechaRaw = row[0]; // A
    const fechaDate = fechaRaw instanceof Date ? fechaRaw : new Date(fechaRaw);
    auditorias.push({
      fechaObj: fechaDate,
      fecha: fechaRaw instanceof Date
        ? Utilities.formatDate(fechaRaw, tz, "dd-MM-yyyy HH:mm")
        : (fechaRaw || ""),
      mes: row[1] || "", // B
      asesor: row[2] || "", // C
      canal: row[3] || "", // D
      tipoGestion: row[4] || "", // E
      idGestion: row[6] || "", // G
      evaluador: row[7] || "", // H
      puntosMejora: row[20] || "", // U
      rowIndex: i
    });
  }

  auditorias.sort(function(a, b) {
    const aTime = a.fechaObj instanceof Date && !isNaN(a.fechaObj) ? a.fechaObj.getTime() : -1;
    const bTime = b.fechaObj instanceof Date && !isNaN(b.fechaObj) ? b.fechaObj.getTime() : -1;
    if (aTime !== bTime) return bTime - aTime;
    return b.rowIndex - a.rowIndex;
  });

  const tablaData = auditorias.slice(0, 10).map(function(a) {
    return {
      fecha: a.fecha,
      mes: a.mes,
      asesor: a.asesor,
      canal: a.canal,
      tipoGestion: a.tipoGestion,
      idGestion: a.idGestion,
      evaluador: a.evaluador,
      puntosMejora: a.puntosMejora
    };
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
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return [];

    const data = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
    const tz = ss.getSpreadsheetTimeZone();

    return data
      .filter(row => (row[0] || "").toString().trim().toUpperCase() === asesorBuscado)
      .map(row => {
        const fechaRaw = row[1];
        return {
          fecha: fechaRaw instanceof Date
            ? Utilities.formatDate(fechaRaw, tz, "MMMM yyyy")
            : fechaRaw.toString(),
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