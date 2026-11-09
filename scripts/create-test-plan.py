from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "Telnyx_Test_Plan.xlsx"

cases = [
    ["TC-01", "Desktop", "Homepage", "Homepage primary message", "Open https://telnyx.com.", "The page loads and its main heading contains “Infrastructure for real-time agents”.", "High"],
    ["TC-02", "Desktop", "Homepage", "Start-building CTA destination", "Open the homepage and inspect its visible primary CTA link.", "A visible link targets /sign-up.", "High"],
    ["TC-03", "Desktop", "Footer", "LinkedIn profile link", "Open the homepage and inspect its footer links.", "A visible link points to linkedin.com/company/telnyx.", "Low"],
    ["TC-04", "Desktop", "Products", "Products overview content", "Open /products.", "The page loads and its main heading contains “Everything you need”.", "Medium"],
    ["TC-05", "Desktop", "Pricing", "Pricing overview content", "Open /pricing.", "The page loads and its main heading contains “Pay for what you use”.", "High"],
    ["TC-06", "Desktop", "Pricing", "SIP Trunking rates navigation", "Open /pricing and inspect links.", "A visible link targets /pricing/elastic-sip.", "Medium"],
    ["TC-07", "Desktop", "Pricing", "Published SIP inbound rate", "Open /pricing/elastic-sip.", "The heading contains “SIP Trunking Pricing” and $0.0032 is visible.", "High"],
    ["TC-08", "Desktop", "Contact", "Enterprise sales page content", "Open /contact-us.", "The page loads and its main heading contains “Contact enterprise sales”.", "High"],
    ["TC-09", "Desktop", "Contact", "Enterprise telephone link", "Open /contact-us and inspect the telephone links.", "A visible link targets tel:+15127377750.", "Medium"],
    ["TC-10", "Desktop", "Resources", "Resources page content", "Open /resources.", "The page loads and its main heading contains “Read it, clone it, or ask the machine”.", "Medium"],
    ["TC-11", "Mobile", "Homepage", "Responsive homepage heading", "At 390×844, open the homepage.", "The main heading is visible.", "High"],
    ["TC-12", "Mobile", "Navigation", "Open mobile menu", "At 390×844, open the homepage and activate Open menu.", "The menu exposes Close menu with aria-expanded=true.", "High"],
    ["TC-13", "Mobile", "Navigation", "Close mobile menu", "Open the menu, then activate Close menu.", "The menu returns to Open menu with aria-expanded=false.", "Medium"],
    ["TC-14", "Mobile", "Navigation", "Mobile contact-sales route", "Open the homepage menu and choose Contact sales.", "The contact page loads and its main heading is visible.", "High"],
    ["TC-15", "Mobile", "Pricing", "Pricing content is accessible", "At 390×844, open /pricing.", "The page heading fits within the viewport and a sign-up link is visible.", "Medium"],
]

headers = ["Test Case ID", "Device", "Feature / Area", "Scenario", "Steps / Preconditions", "Expected Result", "Priority"]
schedule = [
    ["Day", "Activity", "Deliverable"],
    ["Day 1", "Confirm scope, inspect site, agree environments and repository access.", "Approved 15-case plan."],
    ["Day 2", "Set up Cypress, Cucumber, base and mobile configurations.", "Runnable desktop and mobile suites."],
    ["Day 3", "Implement desktop scenarios and stabilize selectors.", "10 desktop cases."],
    ["Day 4", "Implement responsive/mobile scenarios and verify viewport behaviors.", "5 mobile cases."],
    ["Day 5", "Add reports, failed-test screenshots, GitHub Actions, and Pages deployment.", "CI workflow and hosted report."],
    ["Day 6", "Run end-to-end checks, review failures, and refine documentation.", "Verified results and README."],
    ["Day 7", "Submit repository, test plan, report link, and optional walkthrough.", "Submission package."],
]


def col_name(number):
    name = ""
    while number:
        number, remainder = divmod(number - 1, 26)
        name = chr(65 + remainder) + name
    return name


def worksheet_xml(rows, widths, tab_color):
    row_xml = []
    for row_index, row in enumerate(rows, start=1):
        cells = []
        for column_index, value in enumerate(row, start=1):
            address = f"{col_name(column_index)}{row_index}"
            style = 1 if row_index == 1 else (2 if column_index == 1 and len(rows[0]) == 7 else 0)
            cells.append(
                f'<c r="{address}" t="inlineStr" s="{style}"><is><t xml:space="preserve">{escape(str(value))}</t></is></c>'
            )
        row_xml.append(f'<row r="{row_index}">{"".join(cells)}</row>')
    final_col = col_name(len(widths))
    final_row = len(rows)
    cols = "".join(
        f'<col min="{i}" max="{i}" width="{width}" customWidth="1"/>'
        for i, width in enumerate(widths, start=1)
    )
    auto_filter = (
        f'<autoFilter ref="A1:{final_col}{final_row}"/>'
        if len(rows[0]) == 7
        else ""
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<sheetPr><tabColor rgb="{tab_color}"/></sheetPr>'
        '<sheetViews><sheetView workbookViewId="0">'
        '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>'
        f'</sheetView></sheetViews><cols>{cols}</cols>'
        f'<sheetData>{"".join(row_xml)}</sheetData>{auto_filter}</worksheet>'
    )


styles = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts>
  <fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF123B5D"/><bgColor indexed="64"/></patternFill></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top"/></xf></cellXfs>
</styleSheet>"""

with ZipFile(OUTPUT, "w", ZIP_DEFLATED) as workbook:
    workbook.writestr(
        "[Content_Types].xml",
        """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>""",
    )
    workbook.writestr(
        "_rels/.rels",
        """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>""",
    )
    workbook.writestr(
        "xl/workbook.xml",
        """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Test Cases" sheetId="1" r:id="rId1"/><sheet name="One-week Schedule" sheetId="2" r:id="rId2"/></sheets>
</workbook>""",
    )
    workbook.writestr(
        "xl/_rels/workbook.xml.rels",
        """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>""",
    )
    workbook.writestr("xl/styles.xml", styles)
    workbook.writestr(
        "xl/worksheets/sheet1.xml",
        worksheet_xml([headers, *cases], [14, 12, 19, 34, 52, 72, 12], "FF123B5D"),
    )
    workbook.writestr(
        "xl/worksheets/sheet2.xml",
        worksheet_xml(schedule, [14, 72, 46], "FF2C7A7B"),
    )

print(f"Created {OUTPUT} with {len(cases)} test cases.")
