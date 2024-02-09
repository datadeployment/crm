export const create_leads_table = `create table if not exists Leads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) not null,
    email varchar(100) unique not null,
    phone varchar(30),
    dob varchar(20),
    gender varchar(10),
    creditScore varchar(10),
    rationCard varchar(30),
    address text,
    pan varchar(20),
    passport varchar(30),
    telephone varchar(30),
    voterId varchar(30),
    aadhaarNumber varchar(20),
    drivingLicense varchar(30),
    password varchar(200),
    status varchar(200),
    lawyerName varchar(100),
    description text,
    loanAgreementStatus varchar(100),
    assignUser INT,
    createdBy INT NOT NULL,
    updatedBy INT NOT NULL,
    createdAt VARCHAR(20) NOT NULL,
    updatedAt VARCHAR(20) NOT NULL,
    FOREIGN KEY (assignUser) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (updatedBy) REFERENCES User(id) ON DELETE CASCADE
)`

export const create_lead_accounts_table = `create table if not exists LeadAccounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    bankId INT NOT NULL,
    accountType varchar(200),
    ownership varchar(200),
    dateReported varchar(20),
    accountStatus varchar(200),
    dateOpened varchar(20),
    sanctionAmount varchar(20),
    currentBalance varchar(20),
    amountOverdue varchar(20),
    createdBy INT NOT NULL,
    updatedBy INT NOT NULL,
    createdAt VARCHAR(20) NOT NULL,
    updatedAt VARCHAR(20) NOT NULL, 
    FOREIGN KEY (leadId) REFERENCES Leads(id) ON DELETE CASCADE,
    FOREIGN KEY (bankId) REFERENCES Bank(id) ON DELETE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (updatedBy) REFERENCES User(id) ON DELETE CASCADE
)`

// export const nbfcData = [
//     {
//         nbfc_name: "Phoenix ARC Private Limited",
//         email: "customercare.retail@phoenixarc.co.in",
//         website: "www.phoenixarc.co.in",
//         customer_care_number: "1800 120 80 60",
//         postal_address_nbfc: "Retail    Customer Care, Phoenix ARC Private Limited, Dani Corporate Park, 5th Floor,    158, C.S.T. Road, Kalina, Santacruz (E), Mumbai 400 098, India"
//     },
//     {
//         nbfc_name: "Siemens Financial Services Pvt Ltd",
//         email: "harsh.nangalia@siemens.com,\n      sfs.compliance.in@siemens.com",
//         website: "https://new.siemens.com/in/en/products /financing/fair-practice-code.html",
//         customer_care_number: "022-39677000",
//         postal_address_nbfc: "Siemens    Financial Services Pvt Ltd, Plot No. 2, Sector 2, Kharghar Node, Navi Mumbai    - 410 210"
//     },
//     {
//         nbfc_name: "Xander Finance    private Limited",
//         email: "info@xanderfinance.com",
//         website: "https://www.xanderfinance.com/",
//         customer_care_number: "022-61196010",
//         postal_address_nbfc: "Xander    Finance Private Limited, 101, 5 North Avenue, Maker Maxity, Bandra Kurla    complex, Bandra (East), Mumbai – 400051, Maharashtra Phone no: 022-61196010    Fax no: 022-61196080"
//     },
//     {
//         nbfc_name: "Capital Trust    Limited",
//         email: "customercomplaint@capitaltrust.in and escalation on customercomplaintredressal@capitaltrust.in",
//         website: "www.capitaltrust.in",
//         customer_care_number: "9999074312",
//         postal_address_nbfc: "Capital    Trust Limited, 205, Centrum Mall, MG Road, Sultanpur, New Delhi- 110030"
//     },
//     {
//         nbfc_name: "ARKA Fincap    Ltd",
//         email: "grievanceredressal@arkafincap.com\n      customercare@arkafincap.com",
//         website: "www.arkafincap.com",
//         customer_care_number: "22 40471000",
//         postal_address_nbfc: "One    World Center, 1202B, Tower 2B, Floor 12B, Jupiter Mills Compound, Senapati    Bapat Marg, Mumbai 400013"
//     },
//     {
//         nbfc_name: "Encore Asset    Reconstruction Company Pvt Ltd",
//         email: "getintouch@encorearc.com",
//         website: "https://www.encorearc.com",
//         customer_care_number: "0124 - 4527200",
//         postal_address_nbfc: "Grievance    Handling Officer, Encore Asset Reconstruction Company Private Limited, 5th    Floor, Plot no 137, Sector 44, Gurgaon, Haryana – 122002"
//     },
//     {
//         nbfc_name: "Northern Arc    Capital Limited",
//         email: "gro@northernarc.com",
//         website: "https://www.northernarc.com/ grievance-redressal-mechanism",
//         customer_care_number: "1800 4198 766",
//         postal_address_nbfc: "Grievance    Redressal Officer, Northern Arc Capital Limited\n       IIT M Research Park, Phase 1, 10th Floor, No. 1, Kanagam Village, Taramani,    Chennai – 600113"
//     },
//     {
//         nbfc_name: "Capital India",
//         email: "wecare@capitalindia.com\n grievance@capitalindia.com",
//         website: "https://www.capitalindia.com/contact-us",
//         customer_care_number: "91-22-45036000 &    91-11-49546000",
//         postal_address_nbfc: "a.    Level – 20, Birla Aurora, Dr. Annie Besant Road, Worli, Mumbai 400030\n       b. 2nd floor, DLF Centre, Sansad Marg, New Delhi – 110001"
//     },
//     {
//         nbfc_name: "InnoVen    Capital",
//         email: "Kapil@innovencapital.com",
//         website: "https://www.innovencapital.com/ Contactus_in?lang=in",
//         customer_care_number: "022 67446519",
//         postal_address_nbfc: "InnoVen    Capital India Private Limited, 805-A, 8th Floor, The Capital, ‘G’ Block,    Bandra- Kurla Complex, Bandra (East), Mumbai- 400051"
//     },
//     {
//         nbfc_name: "West Bengal Infrastructure Development Finance Corporation Ltd.",
//         email: "complaints-    credit@wbidfc.co.in\n       md@wbidfc.co.in",
//         website: "wbidfc.co.in",
//         customer_care_number: "Not available",
//         postal_address_nbfc: "36A    Hemanta Basu Sarani, Kolkata-700 001"
//     },
//     {
//         nbfc_name: "Galada    Finance Limited",
//         email: "info@galadafinance.in",
//         website: "https://www.galadafinance.in/ contactus.php",
//         customer_care_number: "044 43099009 044 -    28294830",
//         postal_address_nbfc: "Galada    Finance Limited, \"Shanti Sadan\", O.No.4, N.No.7, Shaffee Mohammed    Road, Thousand Lights, Chennai - 600 006"
//     },
//     {
//         nbfc_name: "Newlink    Overseas Finance Ltd",
//         email: "newlin.nofl@gmail.com",
//         website: "http://nofl.in/",
//         customer_care_number: "044 28523284",
//         postal_address_nbfc: "Mamatha Complex, 25    Whites Road, Royapettah, Chennai 600014"
//     },
//     {
//         nbfc_name: "Volvo    Financial Services (India) Pvt Ltd",
//         email: "Level    1 : vfscustomercare@volvo.com\n       Level 2 : shilpa.bhat@volvo.com\nLevel 3: In case still not satisfied then: dnbsbangalore@rbi.org.in",
//         website: "https://www.vfsco.com/in/tools/ compliance.html",
//         customer_care_number: "18004190700",
//         postal_address_nbfc: "Volvo    Financial Services (India) Private Limited\n       #65/2, Bagmane Teck Park, Block-A, 5th Floor, Parin Building, CV Raman    Nagar, Bangalore 560093"
//     },
//     {
//         nbfc_name: "Veritas    Finance Private Limited",
//         email: "Customercare@veritasfin.in",
//         website: "https://www.veritasfin.in/contact-us.php",
//         customer_care_number: "1800-599-5500",
//         postal_address_nbfc: "Customer    Care Department, Veritas Finance Private Limited, SKCL Central Square I,    South Wing, First Floor, Unit No.C28-C35, CIPET Road, Thiru Vi Ka Industrial    Estate, Guindy, Chennai-600032"
//     },
//     {
//         nbfc_name: "CNH Industrial    Capital India Pvt Limited",
//         email: "cnhicapindia@cnhind.com",
//         website: "https://www.cnhindustrialcapital.com/en_in",
//         customer_care_number: "18002582644    (Toll free)\n       0124-6659100",
//         postal_address_nbfc: "CNH    Industrial Capital India Pvt Limited, Plot no 14 A, ATC building, sector    18, Maruti Industrial complex, Udyog Vihar, Gurugram - 122015"
//     },
//     {
//         nbfc_name: "Fortune    Integrated Assets Finance Limited",
//         email: "afccompliance@itiorg.com",
//         website: "www.itiorg.com",
//         customer_care_number: "022 40273600",
//         postal_address_nbfc: "Fortune    Integrated Assets Finance Limited, ITI House, 36, Dr. Shirodkar Marg Parel,    Mumbai 400 012."
//     },
//     {
//         nbfc_name: "Avendus    Finance Private Limited",
//         email: "afplig@avendus.com",
//         website: "https://ddei5-0-ctp.trendmicro.com:443/wis/clicktime/v1/query?url= https%3a%2f%2fwww.avendus.com%2f Upload%2fMisc%2fgrievance%2dredressal%2dmechanism.pdf &umid=574C2C9E-DDA0-5205-8462-0806FBB9A239&auth=ebcd765ab5c821c5f024a f176693ef3a0bcd3bc3-5bf274f272ed2edb58c917f53853e6d5f7e01c6d",
//         customer_care_number: "0226648 0950",
//         postal_address_nbfc: "Avendus    Finance Private Limited\n       The IL&FS Financial Centre, 6th    Floor, C & D Quadrant,     Bandra Kurla Complex Bandra (East),    Mumbai- 400 051"
//     },
//     {
//         nbfc_name: "Arman    Financial Services Limited",
//         email: "finance@armanindia.com",
//         website: "https://www.armanindia.com",
//         customer_care_number: "18001027626",
//         postal_address_nbfc: "Arman    Financial Services Limited, 502-503, Sakar III, Opp. Old High Court, Ashram    Road, Ahmedabad - 380 014, Gujarat"
//     },
//     {
//         nbfc_name: "Namra Finance    Limited",
//         email: "HO@namrafinance.com",
//         website: "https://namrafinance.com",
//         customer_care_number: "18001027626",
//         postal_address_nbfc: "Namra    Finance Limited, 502-3-4, Sakar III, Opp. Old High Court, Ashram Road,    Ahmedabad - 380 014 Gujarat"
//     },
//     {
//         nbfc_name: "RattanIndia    Finance Pvt. Ltd",
//         email: "Wecare@rattanindia.in\n       Customercare@rattanindia.in",
//         website: "https://www.rattanindia.in/contact",
//         customer_care_number: "Not available",
//         postal_address_nbfc: "RattanIndia    Finance Pvt. Ltd. Regus Vasant Square, Level 3, Vasant Square Mall, Pocket V,    Sector B, Vasant Kunj, New Delhi-110070"
//     },
//     {
//         nbfc_name: "Edelweiss    Retail Financial Services",
//         email: "For    ESOP clients: Esop.Finance@edelweissfin.com\n       For LAS clients: LAS.Servicing@edelweissfin.com",
//         website: "https://www.edelweissretailfin.com/contact-us/",
//         customer_care_number: "040-49059999 Extn:    112",
//         postal_address_nbfc: "Mr. Venkatesh Gade, 4th Floor, Plot No 5, M    B Towers Road No 2, Banjara Hills Tel No. +91 (40) 4115 1636 Ext.40036 Email    id: Efil.grievancecell@edelweissfin.com"
//     },
//     {
//         nbfc_name: "ICL Fincorp    Ltd",
//         email: "md@iclfincorp.com",
//         website: "https://www.iclfincorp.com/contact-us",
//         customer_care_number: "18003133353",
//         postal_address_nbfc: "Mr. K G Anilkumar, Chairman & Managing Director, ICL Fincorp Ltd, No.61/1 VGP Complex First Avenue, Ashok    Nagar Chennai, Tamil Nadu - 600 083"
//     },
//     {
//         nbfc_name: "APAC Financial    Services Pvt. Ltd.",
//         email: "complaint.apac@apacfin.com",
//         website: "https://apacfin.com/contact",
//         customer_care_number: "1800 313 205    205, 022 - 66668169",
//         postal_address_nbfc: "APAC Financial Services Private Limited, 1st Floor, Ashford Centre, Opposite    Peninsula Corporate Park, Shanker Rao Naram Marg, Lower Parel - West, Mumbai    - 400 013."
//     },
//     {
//         nbfc_name: "Riviera Investors Private Limited",
//         email: "grievances@indifi.com",
//         website: "https://www.indifi.com/riviera",
//         customer_care_number: "0124-6072244 or    +91-9696555444",
//         postal_address_nbfc: "Riviera    Investors Private Limited, Plot No. 63, Second Floor, Sector – 44,    Institutional Area, Gurgaon – 122002"
//     },
//     {
//         nbfc_name: "Growth Source Financial Technologies Limited (Protium)",
//         email: "customerservice@growthsourceft.com\n       nodal.officer@protium.co.in",
//         website: "https://protium.co.in/complaints/\n\n       https://protium.co.in/grievance-redressal-policy/",
//         customer_care_number: "Customer    Care number – +91 93218 21614\n       Nodal Office Number – +91 85919 84415",
//         postal_address_nbfc: "Growth    Source Financial Technologies Limited (Protium), Nirlon Knowledge Park (NKP)    B6, Second Floor, Pahadi Village, Off. The Western Express Highway, Cama    Industrial Estate, Goregaon (E), Mumbai, Maharashtra 400063"
//     },
//     {
//         nbfc_name: "JAYLAKSHMI    CREDIT COMPANY LIMITED",
//         email: "smn_kadoli@yahoo.com,\n       jariwalakr@gmail.com,\n       pranavnaik1510@yahoo.com",
//         website: "Not available",
//         customer_care_number: "Not available",
//         postal_address_nbfc: "3/209,    Ghanchi Sheri, Navapura, Surat, Gujrat, Pin.395003\n       9824529201, 9824199713, 8866351436"
//     },
//     {
//         nbfc_name: "Shriram    Transport Finance Company Ltd",
//         email: "sambhav.jain@stfc.in",
//         website: "https://www.stfc.in/contact-us/",
//         customer_care_number: "18001034959",
//         postal_address_nbfc: "Shriram    Transport Finance Company Limited, Wockhardt Towers, 3rd Floor, West Wing,    G-Block, Bandra-Kurla Complex, Bandra East Mumbai 400051, Maharashtra"
//     },
//     {
//         nbfc_name: "TAMILNADU TRANSPORT DEVELOPMENT FINANCE CORPORATION Ltd",
//         email: "grievance.tdfc@gmail.com",
//         website: "www.tdfc.in",
//         customer_care_number: "Not available",
//         postal_address_nbfc: "TAMILNADU    TRANSPORT DEVELOPMENT FINANCE CORPORATION Ltd, TAMILNADU TOURISM COMPLEX IV    FLOOR, NO.2, WALLAJAH ROAD, CHENNAI - 6000002."
//     },
//     {
//         nbfc_name: "Sri Vijayaram Hire Purchase    & Leasing Finance Ltd",
//         email: "vijayaramhirepurchase@gmail.com",
//         website: "Not available",
//         customer_care_number: "Not available",
//         postal_address_nbfc: "Sri    Vijayaram Hire Purchase & Leasing    Finance Ltd, 22/97, Thayumanavar Street, Attur (Po & Tk) Salem (Dt) - 636 102. Phone No:    04282 240322 / 98946 70004."
//     },
//     {
//         nbfc_name: "Cholamandalam Investment and Finance Company Limited.",
//         email: "Level    1 : customercare@chola.murugappa.com\n       Level 2 : gro@chola1.murugappa.com\n       Level 3 : rincipalnodalofficer@chola.murugappa.com",
//         website: "Website    link :    https://www.cholamandalam.com\n\n       Grievance redressal - https://cholamandalam.com/grievance-redressal.aspx",
//         customer_care_number: "1800-102-4565",
//         postal_address_nbfc: "Registered    Address:\n       Cholamandalam Investment &    Finance Company Limited (CIFCL), Dare House 1st Floor, 2, NSC Bose Road,    Chennai 600001    CIN : L65993TN1978PLC007576.\n\n       Customer Communication Address:\n       Cholamandalam Investment &    Finance Company Limited (CIFCL), ASV Adarsh complex, 719, Pathari Road,        off Mount road, near thousand light metro station, behind Raj Video vision,    Anna Salai, Chennai-600002"
//     },
//     {
//         nbfc_name: "Epimoney    Private Limited",
//         email: "nodal.grievance@epimoney.com",
//         website: "https://epimoney.in/#contact",
//         customer_care_number: "022-62603803",
//         postal_address_nbfc: "Epimoney    Private Limited, 7th Floor, South Annexe, Tower 2,One World Centre 841,    Senapati Bapat Marg, Lower Parel,    Mumbai - 400 013."
//     },
//     {
//         nbfc_name: "IIFL Samasta    Finance Limited",
//         email: "customer.care@iiflsamasta.com",
//         website: "https://iiflsamasta.com/contact-us/",
//         customer_care_number: "1800-120-8868 &    080-4291-3500",
//         postal_address_nbfc: "IIFL    Samasta Finance Limited, 110/6, 3rd floor, Swami Lotus building Krishnappa    Layout, Lalbagh Main Road Bengaluru - 560027 Karnataka.\n       E-Mail ID: contactus@iiflsamasta.com\n       Contact No: 080-42913591 / +918792913128"
//     },
//     {
//         nbfc_name: "Agriwise    Finserv Limited",
//         email: "grievance@agriwise.com",
//         website: "agriwise.com/contact",
//         customer_care_number: "022-40467777",
//         postal_address_nbfc: "Agriwise    Finserv Limited, 601-604, A-Wing, Bonanza Building, Sahar Plaza, J.B. Nagar    Metro Station, J.B. Nagar, Andheri (E), Mumbai – 400059."
//     },
//     {
//         nbfc_name: "John Deere    Financial India Pvt Ltd.",
//         email: "Level    1: JDFIndiaCustomercare@johndeere.com\n       Level 2: Principle Nodal Officer,\n       Mr. Sanjeev Palnitkar Palnitkar Sanjeev\n       (PalnitkarSanjeev@JohnDeere.com)",
//         website: "https://www.deere.co.in/en/our-company/contact-us/",
//         customer_care_number: "18002091034",
//         postal_address_nbfc: "Principle    Nodal Officer, John Deere Financial    India Pvt Ltd., Level II, Tower-15, Cyber City, Magarpatta City, Hadapsar    Pune-411 013"
//     },
//     {
//         nbfc_name: "HDB Financial    Services Limited",
//         email: "customer.support@hdbfs.com\n       gro@hdbfs.com\n       cs.ombudsman@hdbfs.com",
//         website: "https://www.hdbfs.com/customer-support/escalation-form",
//         customer_care_number: "044-4298 4541",
//         postal_address_nbfc: "HDB    Financial Services Limited, New No: 128/4F Old No: Door No: 53 A, 4th Floor    Greams Road, M. N. Office Complex, Chennai - 600006."
//     },
//     {
//         nbfc_name: "MAS Financial Services Limited",
//         email: "grievance@mas.co.in",
//         website: "https://mfsl.co.in/Grievance/FrmGrievance RequestForm.aspx?compId=1",
//         customer_care_number: "1800 202 5555 / 079    4913 7777",
//         postal_address_nbfc: "MAS    Financial Services Limited, Customer Care Department, 6, Ground Floor, Narayan    Chamber, Near Patang Hotel, Nehru Bridge Corner, Ashram Road, Ahmedabad-380009"
//     },
//     {
//         nbfc_name: "L&T    Finance Ltd",
//         email: "Level-1    : a) customercare@ltfs.com,\n       b) customerservice@ltfs.com\n       Level-2 : c) gro@ltfs.com\n       Level-3 : d) PNO@ltfs.com",
//         website: "https://www.ltfs.com/contact-us.html",
//         customer_care_number: "Level-1    : a) Customer Care No: 7264888777,\n       b) Customer Service No: 9158004777\n       Level-2 : c) GRO: 18001020476\n       Level-3 : d) PNO: 18001038712",
//         postal_address_nbfc: "Mr.    Vinod Varadan, Head – GRO, L&T Finance Ltd, 2nd Floor, \"Brindavan    Building\", Plot No 177, C.S.T Road, Kalina, Santacruz (East), Mumbai -    400 098 Telephone number: 022-62125237"
//     },
//     {
//         nbfc_name: "Oxyzo    Financial Services Pvt Ltd",
//         email: "grievanceredressal@oxyzo.in",
//         website: "https://cms.rbi.org.in",
//         customer_care_number: "0124-4006603",
//         postal_address_nbfc: "6th Floor, Tower A,    Global Business Park, M.G. Road, Gurugram-122001"
//     },
//     {
//         nbfc_name: "ECL Finance    Limited",
//         email: "homeservice@edelweissfin.com",
//         website: "www.edelweissretailfin.com",
//         customer_care_number: "18001026371",
//         postal_address_nbfc: "Tower    3, Wing B, Kohinoor City Mall, Kohinoor City, Kirol Road, Kurla (West),    Mumbai 400070, Maharashtra"
//     },
//     {
//         nbfc_name: "Infinity    Fincorp Solutions",
//         email: "info@infinityfincorp.com",
//         website: "https://www.infinityfincorp.com/contact-us",
//         customer_care_number: "022-40356600",
//         postal_address_nbfc: "A-507,    Level 5 of Building A, 215-Atrium 151, Andheri-Kurla Road, Andheri East    Mumbai – 400093."
//     },
//     {
//         nbfc_name: "Neogrowth",
//         email: "Helpdesk: helpdesk@neogrowth.in\n(1st point of contact)\n       csmanager:    csmanager@neogrowth.in;\n       (1st    Escalation)\n       Grievance officer:    grievanceofficer@neogrowth.in;\n       (2nd    escalation)\n       Nodal officer:    nodalofficer@neogrowth.in;\n       (Nodal officer escalation)",
//         website: "https://www.neogrowth.in/",
//         customer_care_number: "18004195565 and    9820655655.",
//         postal_address_nbfc: "802,    8th Floor, Tower A, Peninsula Business Park, Ganpatrao Kadam Marg,      Lower Parel (West), Mumbai – 400    013"
//     },
//     {
//         nbfc_name: "Chaitanya    India Fin Credit Pvt. Ltd.",
//         email: "gro.cifcpl@chaitanyaindia.in,\n      customer.care@chaitanyaindia.in",
//         website: "https://www.chaitanyaindia.in/contact-us",
//         customer_care_number: "Kannada:    1800 103 5185\n       Hindi : 1800 1216 685\n       Marathi: 1800 2126 685\n       Tamil : 1800 891 3813",
//         postal_address_nbfc: "No.145,    2nd Floor, NR Square,1st Main Road, Sirsi Circle, Chamrajpete, Bangalore -    560018."
//     },
//     {
//         nbfc_name: "Clix Capital",
//         email: "head.services@clix.capital &\n      nodalofficer@clix.capital",
//         website: "https://ddei5-0-ctp.trendmicro.com:443/wis/clicktime/v1/query?url= https%3a%2f%2fwww.clix.capital%2fwp%2dcontent%2fuploads%2f2021%2f11%2fClix%5f Capital%5fGrievance%5fRedressal.pdf &umid=E72D00A8-DDAF-8B05-A23E-EE872587B300&auth=ebcd765ab5c821c5f024af176693ef3a0bcd3bc3-8dd9e94de8e0d9ba654b73fb126066da6913ef01",
//         customer_care_number: "1800-200-9898",
//         postal_address_nbfc: "901-B,    Two Horizon Centre, DLF Golf Course Road, DLF Phase V, Sector 43, Gurgaon    122002, Haryana"
//     },
//     {
//         nbfc_name: "AEON CREDIT    SERVICE INDIA PRIVATE LIMITED",
//         email: "grievance@aeoncredit.co.in /\n      customercare@aeoncredit.co.in",
//         website: "http://www.aeoncredit.co.in/Contactus",
//         customer_care_number: "022-6226-6800 /    022-4906-6800",
//         postal_address_nbfc: "Unit    No. TF-A-01, 3rd Floor, A wing, Art Guild House, Phoenix Marketcity,       LBS Marg, Kurla (West), Mumbai - 400 070"
//     },
//     {
//         nbfc_name: "Laxmi India    Finleasecap Pvt. Ltd.",
//         email: "glk@lifc.in",
//         website: "https://lifc.co.in/contact",
//         customer_care_number: "0141-4031166",
//         postal_address_nbfc: "2 DFL, Gopinath Marg,    M.I. Road, Jaipur-302001, Rajasthan"
//     },
//     {
//         nbfc_name: "Electronica    Finance Ltd.",
//         email: "customerfirst@efl.co.in or\n      yashodhan.damle@efl.co.in",
//         website: "https://www.efl.co.in/contact-us/",
//         customer_care_number: "1800-233-9718",
//         postal_address_nbfc: "Electronica Finance    Ltd.,  Audumbar, 101/1, Erandwane,  Dr Ketkar Road, Pune    411004, Maharashtra, India"
//     },
//     {
//         nbfc_name: "Manappuram    Finance Ltd.",
//         email: "crm@manappuram.com",
//         website: "https://www.manappuram.com",
//         customer_care_number: "1.    0487-3050574,\n       2. 0487-3050112,\n       3.    0487-3050133,\n     4. 0487-3050238,\n     5.    Toll free number:1800 420 2233(24*7)",
//         postal_address_nbfc: "MANAPPURAM FINANCE    LIMITED IV / 470 (old) W638A (New), Manappuram House Valapad, Thrissur, Kerala, India - 680 567"
//     },
//     {
//         nbfc_name: "Fullerton    India Credit Co. Ltd.",
//         email: "Level    1: namaste@fullertonindia.com\nLevel 2: ccrc@fullertonindia.com\nLevel 3: headcustomerservice@fullertonindia.com",
//         website: "Website link :    https://associations.fullertonindia.com/contact-us.aspx?_ga= 2.154697400.1895502274.1650979289-1370369064.1633088195\n\n     Customer portal link :    https://online.fullertonindia.com/?&_ga= 2.154318136.1895502274.1650979289-1370369064.1633088195#/signin",
//         customer_care_number: "1800 103 6001",
//         postal_address_nbfc: "a. Registered office : Fullerton India Credit Co Ltd., 3rd Floor, No - 165 Megh Towers, PH Road Maduravoyal, Chennai - 600 095\n       \n     b. Corporate office : Fullerton India Credit Co Ltd., 10th Floor, Office No.101, 102 & 103, 2 North Avenue, Maker Maxity, Bandra Kurla Complex, Bandra (East), Mumbai - 400 051\n     \n     c. Corporate office (Annex): B wing, 6th Floor, Supreme Business Park, Hiranandani, Powai, Mumbai – 400072"
//     },
//     {
//         nbfc_name: "Krazybee Services Private    Limited",
//         email: "(a) grievance@kbnbfc.in\n(b) grievance@kreditbee.in",
//         website: "(a)    www.kbnbfc.in\n(b) http://www.kreditbee.in/",
//         customer_care_number: "•    Kreditbee 08044292233\n      • Krazybee – 08044292244",
//         postal_address_nbfc: "3rd Floor, No. 128/9,    Maruthi Sapphire, HAL Old Airport Rd, Murugesh Pallya, Bengaluru, Karnataka    560017"
//     },
//     {
//         nbfc_name: "Cisco Systems Capital India",
//         email: "(a)    kchappar@cisco.com\n(b) cscapj_ar@cisco.com",
//         website: "https://www.cisco.com/c/en/us/buy/payment-solutions/ financing-contact.html?ccid=cc000675&oid=otroth027072",
//         customer_care_number: "080 – 4250 1500    / +91 78292 22991",
//         postal_address_nbfc: "Cisco Systems Capital (India) Private    Limited, Brigade South Parade, No. 10, M.G. Road, Bengaluru – 560001,    Karnataka, India"
//     },
//     {
//         nbfc_name: "ASA International India    Microfinance Limited",
//         email: "ombudsman@asaindiamf.com.",
//         website: "https://india.asa-international.com/contact/",
//         customer_care_number: "1800120115566",
//         postal_address_nbfc: "ASA International India    Microfinance Limited, Victoria Park, 4th Floor, GN 37/2, Sector V, Salt Lake    City, Kolkata - 700091"
//     },
//     {
//         nbfc_name: "Ashv Finance Limited",
//         email: "customersupport@ashvfinance.com\n       monika.thadeshwar@ashvfinance.com",
//         website: "https://www.ashvfinance.com/contact-us/",
//         customer_care_number: "022 6249 2700",
//         postal_address_nbfc: "12B, 3rd Floor, Techniplex-II    IT Park, Off. Veer Savarkar Flyover, Goregaon(West), Mumbai – 400062,    Maharashtra, India"
//     },
//     {
//         nbfc_name: "Digikredit Finance Pvt. Ltd",
//         email: "service@smecorner.com",
//         website: "https://www.smecorner.com/service-request/",
//         customer_care_number: "1800-103-7382",
//         postal_address_nbfc: "Unit No. 1B, 4th Floor,    A-Wing,Times Square Building,Andheri Kurla Road, Andheri (E),Mumbai-400059"
//     },
//     {
//         nbfc_name: "SV CreditLine Limited",
//         email: "grievance@svcl.in\n       customercare@svcl.in",
//         website: "http://www.svcl.in/#/contact",
//         customer_care_number: "18001209040",
//         postal_address_nbfc: "5th Floor, Tower B, SAS Towers Mendicity,    Sector - 38, Gurugram Haryana, India - 122001."
//     },
//     {
//         nbfc_name: "HDFC Credila Financial Services    Limited",
//         email: "grievance@hdfccredila.com",
//         website: "https://www.hdfccredila.com/contact-us/contact-us.html",
//         customer_care_number: "96070 09569 \n       1-800-209-3636",
//         postal_address_nbfc: "B 301, Citi Point        Next to Kohinoor Continental        Andheri-Kurla Road, Andheri (East)        Mumbai - 400 059        Maharashtra, India"
//     },
//     {
//         nbfc_name: "Muthoot    Microfin Limited",
//         email: "mmlcomplaints@muthoot.com",
//         website: "https://muthootmicrofin.com/contacts/",
//         customer_care_number: "1800 1027 631",
//         postal_address_nbfc: "5th Floor, Muthoot    Towers, M.G Road, Kochi 682035"
//     },
//     {
//         nbfc_name: "JM Financial Capital Ltd",
//         email: "Mukesh.gupta@jmfl.com\n       subodh.shinkar@jmfl.com",
//         website: "https://jmfl.com/investor-relations/grievances",
//         customer_care_number: "022- 45057033/+91 9892835017",
//         postal_address_nbfc: "Customers can send post at the    address of GRO and Nodal/Principal Nodal Officer at address - 4th floor, B Wing. Suashish IT    Park, Plot No. 68E, off Datta Pada Road, Opp. Tata Steel, Borivali (E),    Mumbai - 400 066"
//     },
//     {
//         nbfc_name: "Indian School Finance Company    (ISFC)",
//         email: "customersupport@isfc.in",
//         website: "https://ddei5-0-ctp.trendmicro.com:443/wis/clicktime/v1/query?url= https%3a%2f%2fisfc.in%2fcontact&umid=82191699-DE2A-2505-855C- DAA63A6ED241&auth=ebcd765ab5c821c5f024af176693ef3a0bcd3bc3- 92a05276638e9ebe91a2981a34010260e64bf4aa",
//         customer_care_number: "9154116665",
//         postal_address_nbfc: "INDIAN SCHOOL FIANANCE COMPANY,    Unit No- 8-2-269/2/52, 1st Floor, Plot No 52, Sagar Society, Road No 2,    Banjara Hills, Hyderabad -500034.Tel : 040-48555957"
//     },
//     {
//         nbfc_name: "Vistaar Financial Services Pvt    Ltd",
//         email: "contactus@vistaarfinance.com",
//         website: "https://www.vistaarfinance.com/contact",
//         customer_care_number: "080 - 30088494",
//         postal_address_nbfc: "Vistaar Financial Services    Private Limited, Plot No 59 & 60- 23,22nd Cross, 29th Main BTM 2nd Stage,    Bengaluru 560076"
//     },
//     {
//         nbfc_name: "Clix Capital",
//         email: "head.services@clix.capital \n       nodalofficer@clix.capital",
//         website: "https://ddei5-0-ctp.trendmicro.com:443/wis/clicktime/v1/query?url= https%3a%2f%2fwww.clix.capital%2fwp%2dcontent%2fuploads%2f2021%2f11%  2fClix%5fCapital%5fGrievance%5fRedressal.pdf&umid=6547665E-DE2A-6005-82D7-809E10BF4B18&auth=ebcd765ab5c821c5f024af176693ef3a0bcd3bc3- bae391cad7c6394d1213ae098cfe7ce514076ca9",
//         customer_care_number: "1800-200-9898",
//         postal_address_nbfc: "901-B, Two Horizon Centre, DLF    Golf Course Road, DLF Phase V, Sector 43, Gurgaon 122002, Haryana"
//     },
//     {
//         nbfc_name: "Midland Microfin Limited",
//         email: "grievance.redressal@midlandmicrofin.com",
//         website: "https://www.midlandmicrofin.com/contact-us/",
//         customer_care_number: "0181- 5085555,    0181-5086666, \n       Toll Free Number: 18001370600\n       GRO Number: 0181 -5076000",
//         postal_address_nbfc: "Midland Microfin Limited, The    Axis, Plot No. 1, R.B. Badri Dass Colony, BMC Chowk, G.T. Road,    Jalandhar-144001"
//     },
//     {
//         nbfc_name: "MANAPPURAM FINANCE LIMITED",
//         email: "crm@manappuram.com",
//         website: "https://www.manappuram.com/contact.html",
//         customer_care_number: "1. 0487-3050574, 2. 0487-3050112, \n3. 0487-3050133, 4: 0487-3050238.\n5: Toll free number: 1800 420    2233(24*7)",
//         postal_address_nbfc: "MANAPPURAM FINANCE LIMITED IV /    470 (old) W638A (New), Manappuram House Valapad, Thrissur, Kerala, India -    680 567."
//     },
//     {
//         nbfc_name: "Globe Fincap Limited",
//         email: "gro@globefincap.com",
//         website: "Not available",
//         customer_care_number: "011-30412345",
//         postal_address_nbfc: "609, Ansal Bhawan, 16 K.G.    Marg, Connaught Place, New Delhi-110001"
//     },
//     {
//         nbfc_name: "Ford Credit India Pvt. Ltd.",
//         email: "fcicare@ford.com",
//         website: "https://www.fordcreditindia.com/contact-us.html",
//         customer_care_number: "1800-419-2812 / 1800-103-2812",
//         postal_address_nbfc: "Ford Credit India Pvt. Ltd.,        Building - 4B, 4th Floor,        RMZ Millenia Business Park, Phase-II, Dr MGR Road, North Veeranam Salai,Perungudi,    Chennai, Tamil Nadu – 600096"
//     },
//     {
//         nbfc_name: "Ambit Finvest Pvt. Ltd.",
//         email: "principalnodalofficer@ambit.co\n       grievance.sme@ambit.co\n       nodalofficer.sme@ambit.co",
//         website: "https://finvest.ambit.co/",
//         customer_care_number: "22 6841 0000, 91159 98000",
//         postal_address_nbfc: "A506-A510, Kanakia Wall Street,    Andheri-Kurla Road, Chakala, Andheri (East) Mumbai – 400093"
//     },
//     {
//         nbfc_name: "IIFL Finance Limited",
//         email: "nodalofficer@iifl.com &    PNO@iifl.com",
//         website: "https://www.iifl.com/contact-us/raise-a-request",
//         customer_care_number: "1860-267-3000 or 7039-05-000",
//         postal_address_nbfc: "IIFL Finance Limited.IIFL    House, Plot No.B-23, Sun Infotech Park, Road, 16V, Thane Industrial Area,    Wagle Estate, Thane, Maharashtra 400604"
//     },
//     {
//         nbfc_name: "Kinara Capital",
//         email: "managercustomercare@kinaracapital.com\n       headcustomercare@kinaracapital.com\n       nodalofficer@kinaracapital.com\n     chiefnodalofficer@kinaracapital.com",
//         website: "https://www.kinaracapital.com/contact-us/",
//         customer_care_number: "1-800-103-2683",
//         postal_address_nbfc: "Kinara Capital,        50, Second Floor, 100 Feet Road,        HAL II Stage, I        Indiranagar,        Bengaluru,        Karnataka 560038"
//     },
//     {
//         nbfc_name: "Bussan Auto Finance India Pvt.    Ltd.",
//         email: "www.bafindia.com \n       customerservice@bafindia.com\n     grievanceofficer@bafindia.com",
//         website: "https://www.bafindia.com/contact_helpdesk",
//         customer_care_number: "011 – 49580301",
//         postal_address_nbfc: "The Manager - Customer    Services,        Bussan Auto Finance India Private Limited         04th Floor, Videocon Tower, E-1, Jhandewalan Extn., New Delhi – 110055"
//     },
//     {
//         nbfc_name: "ARTH MICRO FINANCE PRIVATE    LIMITED",
//         email: "arth@arthfinance.com",
//         website: "https://arthfinance.com/contact/",
//         customer_care_number: "8290494949",
//         postal_address_nbfc: "ARTH MICRO FINANCE PRIVATE LIMITED        A-64, Residential Colony, Sitapura Industrial Area,        Tonk Road, Jaipur- 302022"
//     },
//     {
//         nbfc_name: "Capfloat Financial Services    Private Limited",
//         email: "myloan@capitalfloat.com.",
//         website: "https://ddei5-0-ctp.trendmicro.com:443/wis/clicktime/v1/query?url= https%3a%2f%2fcapitalfloat.com%2fwp%2dcontent%2fupl oads%2f2022%2f02%2fGrievance%5fRedressal%5fPolicy %2dV%2d1.7.pdf&umid=C8017197-DE2B-4605-A0D1- EEDEF86580E1&auth=ebcd765ab5c821c5f024af176693ef3a0bcd3bc3-33541f7c4fcb1d84366831f4ce8de1c213bb207d",
//         customer_care_number: "080 6807 5001",
//         postal_address_nbfc: "Capfloat Financial Services    Private Limited        New no. 3 (Old no. 211), Gokaldas Platinum, Upper Palace Orchards,        Bellary Road, Sadashiva Nagar, Bengaluru, Karnataka 560080"
//     },
//     {
//         nbfc_name: "SBI DFHI Limited",
//         email: "evp@sbidfhi.com",
//         website: "https://www.sbidfhi.co.in/wp-content/uploads/Grievance-Redressal-Officer-1.pdf",
//         customer_care_number: "Not available",
//         postal_address_nbfc: "SBI DFHI Limited, 5th floor,    Mistry Bhavan, 122, Dinshaw Vaccha Road, Churchgate, Mumbai-400020"
//     },
//     {
//         nbfc_name: "Russell Credit Limited",
//         email: "RussellCredit.Limited@itc.in",
//         website: "Not available",
//         customer_care_number: "Not available",
//         postal_address_nbfc: "Virginia House, 37 J. L. Nehru    Road, Kolkata 700 071."
//     },
//     {
//         nbfc_name: "ORIX Leasing & Financial    Services India Limited",
//         email: "gro@orixindia.com",
//         website: "https://www.orixindia.com/customer-grievances.php",
//         customer_care_number: "9877 333 444",
//         postal_address_nbfc: "Orix Leasing & Financial    Services India Ltd., D-71/2, Najafgarh Road Industrial Area, New Delhi –    110015, Contact No: 011 - 45623200"
//     },
//     {
//         nbfc_name: "Samunnati Financial    Intermediation & Services Pvt Ltd",
//         email: "customervoice@samunnati.com\n       headcustomercare@samunnati.com\n       gro@samunnati.com",
//         website: "https://site.samunnati.com/contact-us/",
//         customer_care_number: "97908 97000",
//         postal_address_nbfc: "Samunnati Financial    Intermediation & Services Pvt Ltd Baid Hitech Park, 129-B, 8th Floor,    ECR, hiruvanmiyur,        Chennai – 600041"
//     },
//     {
//         nbfc_name: "Poonawalla Fincorp Limited",
//         email: "customercare@poonawallafincorp.com",
//         website: "https://poonawallafincorp.com/contact-us.php",
//         customer_care_number: "1800-266-3201",
//         postal_address_nbfc: "Poonawalla Fincorp Limited,        601, 6th Floor, Zero One IT Park, Survey No 79/1,        Ghorpadi, Mundhwa Road, Pune – 411036."
//     },
//     {
//         nbfc_name: "HDB Financial Services Ltd",
//         email: "customer.support@hdbfs.com\n       gro@hdbfs.com\n       cs.ombudsman@hdbfs.com",
//         website: "https://www.hdbfs.com/customer-support/escalation-form",
//         customer_care_number: "044-4298 4541",
//         postal_address_nbfc: "HDB Financial Services Limited,        New No: 128/4F Old No: Door No: 53 A, 4th Floor Greams Road,M. N. Office    Complex, Chennai - 600006."
//     },
//     {
//         nbfc_name: "BOB Financial Solutions Dept.",
//         email: "crm@bobfinancial.com\ncrm1@bobfinanical.com\n     escalations@bobfinancial.com",
//         website: "https://www.bobfinancial.com/grievance-redressal-mechanism.jsp",
//         customer_care_number: "1800 225 100 & 1800 103    1006",
//         postal_address_nbfc: "BOB Financial Solutions Dept. Customer Service Dept. 1502/1503/1504 DLH Park S V Road Goregaon(W) Mumbai-400104, Maharashtra-27"
//     },
//     {
//         nbfc_name: "Citicorp Finance India Limited",
//         email: "wecare@citi.com\n       wecare.cfil.india@citi.com",
//         website: "https://www.citicorpfinance.co.in/CFIL/customer-service.htm?eOfferCode=INCCUCUSSERV",
//         customer_care_number: "1800-26-70-124\n       1800-11-99-49\n       011-39001111",
//         postal_address_nbfc: "Customer Service, Citicorp    Finance (India) Limited        3 LSC, Pushp Vihar, New Delhi –110062"
//     },
//     {
//         nbfc_name: "Shriram Transport Finance    Company Limited",
//         email: "sambhav.jain@stfc.in",
//         website: "https://www.stfc.in/contact-us/",
//         customer_care_number: "18001034959",
//         postal_address_nbfc: "Shriram Transport Finance    Company Limited, Wockhardt Towers, 3rd Floor, West Wing, G-Block,    Bandra-Kurla Complex, Bandra East Mumbai 400051, Maharashtra"
//     },
//     {
//         nbfc_name: "Dhani Loans and Services    Limited",
//         email: "support@dhani.com\n       grievance@dhani.com",
//         website: "https://www.dhaniloansandservices.com/contact-us",
//         customer_care_number: "0124 - 6555555",
//         postal_address_nbfc: "Dhani Loans and Services    Limited        Concept Tech Park Building,        Plot No. 422 B, Udyog Vihar,        Phase-4, Gurugram – 122016"
//     },
//     {
//         nbfc_name: "Jalan Chemical Industries Pvt    Ltd",
//         email: "grievance@jacipl.com.",
//         website: "https://jacipl.com/index.php/grievance-redressal-mechanism-and-customer-relationship-management/",
//         customer_care_number: "033- 6646 1500.",
//         postal_address_nbfc: "27AB Royd Street, Ground Floor,    Kolkata – 700016."
//     },
//     {
//         nbfc_name: "Inditrade    Microfinance Limited.",
//         email: "anilkumar.kr@inditrade.com",
//         website: "https://www.inditrade.com/Contact-us.aspx",
//         customer_care_number: "1800 266 8703",
//         postal_address_nbfc: "Inditrade Microfinance Limited,    Unit No. T1-B, 5th Floor, C-Wing, Phoenix House, Senapati Bapat Marg, Lower    Parel, Mumbai- 400013"
//     },
//     {
//         nbfc_name: "Nirmal Bang Financial Services    Privated Limited",
//         email: "las@nirmalbang.com",
//         website: "https://www.nirmalbang.com/products-and-services/loan-against-securities.aspx",
//         customer_care_number: "022-39269000, 022-39267500",
//         postal_address_nbfc: "601,6th Floor, Khandelwal    House, Poddar Road, Malad (East), Mumbai – 400097"
//     },
//     {
//         nbfc_name: "GTP Finance Limited",
//         email: "muthuvelu.ss@gtpfinance.com",
//         website: "http://www.gtpfinance.com/contact.php",
//         customer_care_number: "Not    Available",
//         postal_address_nbfc: "GTP FINANCE LIMITED, 4/36, BHARATHI STREET,    SWARNAPURI,    SALEM-636004. TAMINADU."
//     },
//     {
//         nbfc_name: "ICICI Securities Primary    Dealership Ltd.",
//         email: "customercare@isecpd.com",
//         website: "https://www.icicisecuritiespd.com/frm_Contact_Us_Automation.aspx",
//         customer_care_number: "022-2288 2460/70",
//         postal_address_nbfc: "ICICI Centre, H. T. Parekh    Marg, Churchgate, Mumbai 400 020"
//     },
//     {
//         nbfc_name: "Reliance Financial Limited.",
//         email: "ops@reliancefinancial.co.in",
//         website: "http://reliancefinancial.co.in/",
//         customer_care_number: "022-41681200",
//         postal_address_nbfc: "Reliance Financial Limited, 11th Floor,    R-Tech Park, Nirlon Compound, Western Express Highway, Goregaon (East),    Mumbai – 400063."
//     },
//     {
//         nbfc_name: "Kapitaltech",
//         email: "info@kapitaltech.com",
//         website: "Not    Available",
//         customer_care_number: "022 40273743",
//         postal_address_nbfc: "ITI House, 36, Dr. R K    Shirodkar Road,Near M D College, Parel, Mumbai – 400 012."
//     },
//     {
//         nbfc_name: "Niyogin Fintech Limited",
//         email: "customersupport@niyogin.in",
//         website: "https://www.niyogin.com/contact-us",
//         customer_care_number: "1800 266 0266",
//         postal_address_nbfc: "311/312, Neelkanth Corporate    Park, Vidyavihar-West, Mumbai -400 086."
//     },
//     {
//         nbfc_name: "Blue Jay Finlease Limited",
//         email: "customer.care@ziploan.com",
//         website: "https://ziploan.in/contact",
//         customer_care_number: "011 - 43109577",
//         postal_address_nbfc: "607-610, 6th floor, Kailash    building, 26 K.G. marg, New Delhi - 110001"
//     },
//     {
//         nbfc_name: "Light Microfinance Private    Limited",
//         email: "grievanceredressal@lightmicrofinance.com",
//         website: "https://www.lightmicrofinance.com/contact.html",
//         customer_care_number: "079-41057862",
//         postal_address_nbfc: "308, Aggarwal Tower, Plot    no.-2, Sector – 5, Dwarka, New Delhi- 110075 \n       Corporate office: 310, Pinnacle Business Park, Corporate Road, Prahladnagar,    Ahmedabad - 380015"
//     },
//     {
//         nbfc_name: "Manba Finance",
//         email: "nfo@manbafinance.com",
//         website: "https://www.manbafinance.com/contact-us.html",
//         customer_care_number: "18602669989",
//         postal_address_nbfc: "324, Runwal heights, L.B.S    Marg, Opp. nirmal lifestyle, Mulund (west), Mumbai - 400080"
//     },
//     {
//         nbfc_name: "Capri Global Capital Limited",
//         email: "care@capriglobal.in",
//         website: "www.capriglobal.in/contact-us/",
//         customer_care_number: "18001021021",
//         postal_address_nbfc: "Principal Nodal Officer Capri    Global Capital Limited 502, Tower A, Peninsula Business Park, Senapati Bapat    Marg, Lower Parel, Mumbai -400 013. Tel No. – 022- 43548200"
//     },
//     {
//         nbfc_name: "ICL Fincorp Ltd.",
//         email: "md@ic1fincorp.com",
//         website: "https://www.iclfincorp.com/contact-us",
//         customer_care_number: "1800 31 333 53",
//         postal_address_nbfc: "Chairman & Managing    Director        ICL Fincorp Limited        No.61/ 1, VGP Complex First Avenue, Ashok Nagar        Chennai, Tamil Nadu - 600083"
//     },
//     {
//         nbfc_name: "Oxyzo Financial Services",
//         email: "grievanceredressal@oxyzo.in",
//         website: "https://www.oxyzo.in/contact-us",
//         customer_care_number: "0124- 4006603",
//         postal_address_nbfc: "6th Floor, Tower A, Global    Business Park, M.G. Road, Gurugram-122001"
//     },
//     {
//         nbfc_name: "Si Creva Capital Services Pvt.    Ltd.",
//         email: "care@kissht.com\n       info@sicrevacapital.com",
//         website: "https://sicrevacapital.com/contact-us-2/",
//         customer_care_number: "022 62820570 / 022 48914921",
//         postal_address_nbfc: "Si Creva Capital Services Pvt.    Ltd.,        2nd Floor, Der Deutsche Parkz,        Next to Nahur Station, Bhandup West,        Mumbai, Maharashtra 400078"
//     },
//     {
//         nbfc_name: "Tata Capital Financial Services    Limited",
//         email: "customercare@tatacapital.com",
//         website: "https://www.tatacapital.com/contact-us/customer-grievances.html",
//         customer_care_number: "1860 267 6060",
//         postal_address_nbfc: "Tata Capital Financial Services    Limited, Lodha I-Think Techno Campus | A/ Wing, 4th Floor | Off. Pokhran Rd    2, Behind TCS Yantra Park| Thane (West) - 400 607."
//     },
//     {
//         nbfc_name: "U GRO Capital Limited",
//         email: "customercare@ugrocapital.com",
//         website: "https://www.ugrocapital.com/contact-us",
//         customer_care_number: "22 41821600",
//         postal_address_nbfc: "UGRO Capital Limited, Equinox    Business Park, Tower 3, Fourth Floor, Off BKC, LBS Road, Kurla, Mumbai,    Maharashtra – 400070"
//     },
//     {
//         nbfc_name: "Bell Finvest India Ltd.",
//         email: "contactus@bellfinvest.com",
//         website: "https://bellfinvest.com/contact.html",
//         customer_care_number: "022-67471369",
//         postal_address_nbfc: "1107 Maker Chamber V Nariman    Point Mumbai - 400021"
//     },
//     {
//         nbfc_name: "Sharekhan BNP Paribas Financial    Services Limited",
//         email: "support@sharekhanfinance.com",
//         website: "Not    Available",
//         customer_care_number: "022 25753200/-500, 022    330546000, 022 61151111",
//         postal_address_nbfc: "10th Floor, Beta Building,    Lodha iThink Techno Campus, Off. JVLR, Opp. Kanjurmarg Railway Station,    Kanjurmarg (East), Mumbai – 400042, Maharashtra."
//     },
//     {
//         nbfc_name: "Moneywise Financial Services    Pvt Ltd",
//         email: "nbfccare@smcfinance.com",
//         website: "https://www.smcfinance.com/policies.php",
//         customer_care_number: "1800-1188-18\n       9821963444",
//         postal_address_nbfc: "Moneywise Financial Services    Private Limited, 11/6B, 3rd Floor, Shanti Chambers, Pusa Road, New Delhi-    110005"
//     },
//     {
//         nbfc_name: "Toyota Financial Services India    Ltd",
//         email: "customerfirst@tfsin.co.in",
//         website: "https://www.toyotafinance.co.in/grievance/",
//         customer_care_number: "1800-419-1801",
//         postal_address_nbfc: "Toyota Financial Services India    Ltd        1st Floor, Centropolis, No. 21 Langford Road Richmond Town | Bangalore – 560    025"
//     },
//     {
//         nbfc_name: "Arohan    Financial Services Limited",
//         email: "customercare@arohan.in",
//         website: "https://www.arohan.in/grievance-redressal.php",
//         customer_care_number: "1800 -103 2375",
//         postal_address_nbfc: "The Grievance Redressal Officer    (Ms. Indira Ghosh)      Arohan Financial Services Limited PTI Building, 4th Floor, DP Block, DP-9,    Sector-V, Salt Lake, Kolkata – 700091, West Bengal"
//     },
//     {
//         nbfc_name: "Avanse Financial Services    Limited",
//         email: "wecare@avanse.com\n       gro@avanse.com",
//         website: "https://www.avanse.com/contact-us",
//         customer_care_number: "1800-266-0200 \n(+91) 22-6680 6464",
//         postal_address_nbfc: "Avanse Financial Services Limited 001 & 002 Fulcrum, A Wing, Ground    Floor, Sahar Road, Next to Hyatt Regency, Andheri (East),    Mumbai – 400 099, Maharashtra."
//     },
//     {
//         nbfc_name: "Sakthi Finance Ltd.",
//         email: "nodalofficer@sakthifinance.com",
//         website: "www.sakthifinance.com/contact-us/",
//         customer_care_number: "1800 1030 120",
//         postal_address_nbfc: "Sakthi finance ltd, 62,    Dr.Nanjappa Road, Coimbatore – 641018, which is the registered office address    of the corporate office. The same details available in the Fair Practices    code notified by us at our website."
//     },
//     {
//         nbfc_name: "Inteccapital",
//         email: "gro@inteccapital.com",
//         website: "https://www.inteccapital.com/reach-us/contact-us/",
//         customer_care_number: "1146522200",
//         postal_address_nbfc: "708,    Manjusha Building, 57,Nehru Place, New Delhi-110019"
//     },
//     {
//         nbfc_name: "SBI Cards and Payment Services Limited",
//         email: "customercare@sbicard.com\n      Nodalofficer@sbicard.com\n      PrincipalNodalofficer@sbicard.com\n      CustomerServiceHead@sbicard.com\n\n     For Mis-selling and  Harassment related complaints - salesgrievance@sbicard.com\n\n     For account closure  on dedicated email id- closurerequest@sbicard.com",
//         website: "www.sbicard.com/email\n     \n    or    \n     \n     SBI Card mobile app/chat bot",
//         customer_care_number: "1860 500 1290, \n     1860 180 1290, 39 02 02  02 (Prefix local the STD code)    or \n     1800 180 1290 (toll free)",
//         postal_address_nbfc: "DLF Infinity Towers, Tower C,\n       12th Floor, Block 2, \n       Building 3, DLF Cyber City, \n       Gurgaon - 122002 (Haryana)\n     India"
//     },
//     {
//         nbfc_name: "SBI Global Factors Ltd",
//         email: "redressal@sbiglobal.in",
//         website: "https://sbiglobal.in/contact.php \n\n     or \n\n   https://clientaccess.sbiglobal.in/SBIClientAccess/Home/Login.aspx",
//         customer_care_number: "Mumbai Office  numbers: 022 - 48890300 / 48890400",
//         postal_address_nbfc: "Registered Office - 6th  Floor, The Metropolitan Building, Bandra Kurla Complex, Bandra East, Mumbai 400  051"
//     }
// ]