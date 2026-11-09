from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "Telnyx_Test_Plan.xlsx"

cases = [
    ["TC-01", "Desktop", "Homepage / Inference", "Explore inference from homepage to pricing", "1. Open the homepage and confirm its hero heading. 2. Scroll to the inference infrastructure section. 3. Follow its pricing link.", "Inference section is visible; navigation reaches /pricing/inference-api and the destination heading is “Inference Pricing”.", "High"],
    ["TC-02", "Desktop", "Homepage / Sign up", "Follow homepage sign-up call to action", "1. Open the homepage and verify the hero. 2. Locate a visible sign-up CTA. 3. Follow it without submitting any form.", "The route changes to /sign-up.", "High"],
    ["TC-03", "Desktop", "Footer / Social", "Find social profiles from site footer", "1. Open the homepage. 2. Scroll to the site footer. 3. Inspect the LinkedIn and X profile links.", "Visible footer links point to linkedin.com/company/telnyx and x.com/telnyx.", "Medium"],
    ["TC-04", "Desktop", "Products / Voice API", "Browse catalog to Voice API detail", "1. Open /products. 2. Follow Browse primitives. 3. Confirm #primitives and locate Voice API. 4. Open the Voice API detail page.", "The catalog anchor works; /products/voice-api renders the Voice API heading and 140+ coverage metric.", "High"],
    ["TC-05", "Desktop", "Voice API", "Inspect Voice API scale and onboarding options", "1. Open /products/voice-api. 2. Verify the product heading. 3. Check its 140+ coverage, 25M+ API request, and 10M+ call-minute metrics. 4. Verify contact and signup links. 5. Scroll to the footer.", "Product metrics and both onboarding routes are present; the footer LinkedIn link is available.", "High"],
    ["TC-06", "Desktop", "Pricing / Plans", "Compare plans and continue to sales", "1. Open /pricing. 2. Follow Compare plans. 3. Verify the plans section and Growth and Enterprise minimums. 4. Follow a sales link.", "The #plans anchor works; $2,000 and $5,000 tiers are shown; the sales link opens /contact-us.", "High"],
    ["TC-07", "Desktop", "Pricing / SIP", "Navigate from catalog to SIP rates", "1. Open /pricing. 2. Follow the SIP Trunking pricing link. 3. Verify inbound and outbound rates. 4. Follow the US pay-as-you-go anchor.", "The SIP page shows $0.0032 inbound and $0.005 outbound starting rates; #pay-as-you-go lands on US pricing.", "High"],
    ["TC-08", "Desktop", "SIP pricing", "Review inbound, outbound, and channel rates", "1. Open SIP Trunking pricing. 2. Scroll to outbound rates and verify the published rate. 3. Scroll to inbound rates and verify the published rate. 4. Inspect inbound channel pricing.", "Each rate section is visible and contains the expected $0.005 outbound, $0.0032 inbound, and $12 first-channel-tier rates.", "High"],
    ["TC-09", "Desktop", "Contact / Sales", "Verify sales and international phone options", "1. Open /contact-us. 2. Confirm response-time guidance. 3. Verify US sales and toll-free telephone links. 4. Count international telephone links.", "Enterprise sales heading and response guidance display; US contact links exist and at least 10 international telephone links are available.", "Medium"],
    ["TC-10", "Desktop", "Resources / Release notes", "Open a current release from resources hub", "1. Open /resources. 2. Follow the Release Notes link. 3. Verify release filtering controls. 4. Open the first release note.", "Resources and release-notes routes render; a release article opens at /release-notes/{slug} with a heading.", "Medium"],
    ["TC-11", "Mobile", "Homepage / Navigation", "Explore responsive homepage and close menu", "1. At 390×844, open the homepage. 2. Verify the visible, in-viewport hero heading. 3. Open the menu and verify its expanded state and contact link. 4. Close the menu.", "Hero heading fits the viewport; menu exposes expanded/collapsed aria states and the contact-sales route.", "High"],
    ["TC-12", "Mobile", "Navigation / Contact", "Navigate from mobile menu to enterprise sales", "1. At 390×844, open the homepage. 2. Open the mobile menu. 3. Choose Contact sales. 4. Verify destination, heading, and sales telephone link.", "Navigation reaches /contact-us and displays the expected heading and telephone contact.", "High"],
    ["TC-13", "Mobile", "Products / Voice API", "Browse product catalog to Voice API on mobile", "1. At 390×844, open /products. 2. Follow Browse primitives. 3. Verify #primitives and the Voice API link. 4. Open Voice API and check heading fit.", "Product anchor and route work; Voice API heading is visible and fits within the mobile viewport.", "High"],
    ["TC-14", "Mobile", "Pricing / Plans", "Compare pricing plans on narrow viewport", "1. At 390×844, open /pricing. 2. Check the heading fits. 3. Follow Compare plans. 4. Verify pay-as-you-go, Growth, and Enterprise pricing and sign-up CTA.", "The plans anchor works; $2,000 and $5,000 tier prices and the sign-up destination remain accessible.", "High"],
    ["TC-15", "Mobile", "Inference pricing / Calculator", "Adjust inference estimate and switch service tier", "1. At 390×844, open inference pricing. 2. Record the displayed estimate. 3. Change input tokens to 2,000,000,000. 4. Verify the estimate increases. 5. Select Priority and verify its selected state.", "Calculator estimate increases after the input change; Priority tab becomes selected.", "High"],
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
        row_height = (
            28
            if row_index == 1
            else (60 if len(rows[0]) == 7 else 36)
        )
        row_xml.append(
            f'<row r="{row_index}" ht="{row_height}" customHeight="1">{"".join(cells)}</row>'
        )
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
