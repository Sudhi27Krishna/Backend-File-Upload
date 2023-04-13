from openpyxl import Workbook, load_workbook

wb = load_workbook('./uploadedExcels/NewGrades.xlsx')
ws = wb.active

ws.delete_rows(3)
ws.delete_rows(4)
ws.delete_rows(5)
ws.delete_rows(6)
ws.delete_rows(7)

ws.delete_cols(2)

wb.save(".\\updatedExcels\\Node-Output.xlsx")