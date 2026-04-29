import os

def include(filename):
    filepath = f"{filename}.html"
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            return f.read()
    return ""

with open('index.html', 'r') as f:
    content = f.read()

content = content.replace("<?!= include('styles'); ?>", include('styles'))
content = content.replace("<?!= include('scripts'); ?>", include('scripts'))

with open('index_merged.html', 'w') as f:
    f.write(content)
