html = open("html_content.txt", "r", encoding="utf-8").read()
open("core/templates/home.html", "w", encoding="utf-8").write(html)
print("HTML written OK")
