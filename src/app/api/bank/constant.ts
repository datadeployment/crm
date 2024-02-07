export const create_bank_table = `create table if not exists Bank (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bank_category_id INT default null,
    name varchar(100) unique not null,
    contact_us_link varchar(2000),
    createdBy INT NOT NULL,
    updatedBy INT NOT NULL,
    createdAt VARCHAR(20) NOT NULL,
    updatedAt VARCHAR(20) NOT NULL, 
    FOREIGN KEY (bank_category_id) REFERENCES BankCategory(id) ON DELETE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (updatedBy) REFERENCES User(id) ON DELETE CASCADE
)`

export const create_bank_category_table = `create table if not exists BankCategory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) unique not null,
    createdBy INT NOT NULL,
    updatedBy INT NOT NULL,
    createdAt VARCHAR(20) NOT NULL,
    updatedAt VARCHAR(20) NOT NULL, 
    FOREIGN KEY (createdBy) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (updatedBy) REFERENCES User(id) ON DELETE CASCADE
)`


export const bankdata = [
    {
        category_name: null,
        bank_list: [
            {
                bank_name: "State Bank of India",
                contact_us_link: "https://sbi.co.in/web/customer-care/addresses-and-helpline-nos-of-grievances-redressal-cell"
            }
        ]
    },
    {
        category_name: "Nationalised Banks",
        bank_list: [
            {
                bank_name: "Bank of Baroda",
                contact_us_link: "https://www.bankofbaroda.in/customer-support/grievance-redressal"
            },
            {
                bank_name: "Bank of India",
                contact_us_link: "https://www.bankofindia.co.in/forms/Grievance"
            },
            {
                bank_name: "Bank of Maharashtra",
                contact_us_link: "https://bankofmaharashtra.in/complaints_grievances"
            },
            {
                bank_name: "Canara Bank",
                contact_us_link: "https://canarabank.com/User_page.aspx?menulevel=5&menuid=5&CatID=2"
            },
            {
                bank_name: "Central Bank of India",
                contact_us_link: "https://www.centralbankofindia.co.in/en/customer_care"
            },
            {
                bank_name: "Indian Bank",
                contact_us_link: "https://www.indianbank.in/departments/online-customer-complaints/#!"
            },
            {
                bank_name: "Indian Overseas Bank",
                contact_us_link: "https://www.iob.in/Grievances_Redressal_mechanism"
            },
            {
                bank_name: "Punjab National Bank",
                contact_us_link: "https://www.pnbindia.in/Lodge-Complaint.html"
            },
            {
                bank_name: "Union Bank of India",
                contact_us_link: "https://www.unionbankofindia.co.in/english/grievances-redressal.aspx"
            },
            {
                bank_name: "Punjab & Sind Bank",
                contact_us_link: "https://punjabandsindbank.co.in/content/recomp"
            },
            {
                bank_name: "UCO Bank",
                contact_us_link: "https://www.ucobank.com/english/Grievance-Redressel.aspx"
            }
        ]
    },
    {
        category_name: "Indian Banks",
        bank_list: [
            {
                bank_name: "Axis Bank Limited",
                contact_us_link: "https://www.axisbank.com/contact-us/grievance-redressal/retail-banking-grievance-redressal"
            },
            {
                bank_name: "Bandhan Bank Limited",
                contact_us_link: "https://bandhanbank.com/grievance-redressal"
            },
            {
                bank_name: "CSB Bank Limited",
                contact_us_link: "https://www.csb.co.in/complaints-redressal"
            },
            {
                bank_name: "City Union Bank Limited",
                contact_us_link: "https://www.cityunionbank.com/grievance"
            },
            {
                bank_name: "DCB Bank Limited",
                contact_us_link: "https://www.dcbbank.com/complaint-redressal-form"
            },
            {
                bank_name: "Dhanalaxmi Bank Limited",
                contact_us_link: "https://www.dhanbank.com/footer/grievance_redressal.aspx"
            },
            {
                bank_name: "Federal Bank Limited",
                contact_us_link: "https://www.federalbank.co.in/grievance-redressal"
            },
            {
                bank_name: "HDFC Bank Limited",
                contact_us_link: "https://leads.hdfcbank.com/applications/webforms/apply/grievance_redressal_form.asp?_ga=2.122705289.329845265.1540272882-1750795496.1540183009"
            },
            {
                bank_name: "ICICI Bank Limited",
                contact_us_link: "https://www.icicibank.com/complaints/complaints.page"
            },
            {
                bank_name: "IndusInd Bank Limited",
                contact_us_link: "https://www.indusind.com/in/en/personal/grievance-redressal.html"
            },
            {
                bank_name: "IDFC FIRST Bank Limited",
                contact_us_link: "https://www.idfcfirstbank.com/customer-service"
            },
            {
                bank_name: "Jammu & Kashmir Bank Limited",
                contact_us_link: "https://www.jkbank.com/others/common/grievance.php"
            },
            {
                bank_name: "Karnataka Bank Limited",
                contact_us_link: "https://karnatakabank.com/complaints"
            },
            {
                bank_name: "Karur Vyasa Bank Limited",
                contact_us_link: "https://www.kvb.co.in/customer-service/feedback-form/"
            },
            {
                bank_name: "Kotak Mahindra Bank Limited",
                contact_us_link: "https://www.kotak.com/en/customer-service/grievance-redressal/banking-service.html"
            },
            {
                bank_name: "Nainital Bank Limited",
                contact_us_link: "https://www.nainitalbank.co.in/english/Complaints_Redressal.aspx"
            },
            {
                bank_name: "RBL Bank Limited",
                contact_us_link: "https://drws17a9qx558.cloudfront.net/document/Footer%20-%20Grievance%20Redressal/GrievanceRedressalProcess.pdf"
            },
            {
                bank_name: "South India Bank Limited",
                contact_us_link: "https://www.southindianbank.com/content/grievance-registration/287"
            },
            {
                bank_name: "Tamilnad Mercantile Bank Limited",
                contact_us_link: "https://www.tmb.in/online-complaint-form.aspx"
            },
            {
                bank_name: "YES Bank Limited",
                contact_us_link: "https://www.yesbank.in/complaints"
            },
            {
                bank_name: "IDBI Bank Limited",
                contact_us_link: "https://www.idbibank.in/banking-complaints-i.aspx"
            }
        ]
    },
    {
        category_name: "Local Area Banks (LABs)",
        bank_list: [
            {
                bank_name: "Coastal Local Area Bank Ltd.",
                contact_us_link: "https://www.coastalareabank.com/happy"
            },
            {
                bank_name: "Krishna Bhima Samruddhi Local Area Bank Limited	",
                contact_us_link: "https://kbsbankindia.in/customerecare.php#:~:text=The%20customer%20may%20approach%20the,Office%20at%20the%20following%20address.&text=Phone%3A%20040%2D23113232."
            },
            {
                bank_name: "Subhadra Local Area Bank Limited	",
                contact_us_link: "http://103.219.60.138/contactus.php"
            }
        ]
    },
    {
        category_name: "Small Finance Banks (SFBs)",
        bank_list: [
            {
                bank_name: "Au Small Finance Bank Limited",
                contact_us_link: "https://www.aubank.in/support/contact-us"
            },
            {
                bank_name: "Capital Small Finance Bank Limited",
                contact_us_link: "https://www.capitalbank.co.in/policy-for-grievance-redressal-in-bank"
            },
            {
                bank_name: "FINCARE Small Finance Bank Limited",
                contact_us_link: "https://fincarebank.com/complaints-and-grievances-form"
            },
            {
                bank_name: "Equitas Small Finance Bank Limited",
                contact_us_link: "https://www.equitasbank.com/grievance-redressal-procedure"
            },
            {
                bank_name: "ESAF Small Finance Bank Limited",
                contact_us_link: "https://www.esafbank.com/complaints-and-grievance-redressal/"
            },
            {
                bank_name: "Suryoday Small Finance Bank Limited",
                contact_us_link: "https://www.suryodaybank.com/smile-centre"
            },
            {
                bank_name: "Ujjivan Small Finance Bank Limited",
                contact_us_link: "https://www.ujjivansfb.in/complaint-existing-customer"
            },
            {
                bank_name: "Utkarsh Small Finance Bank Limited",
                contact_us_link: "https://www.utkarsh.bank/help-and-support"
            },
            {
                bank_name: "North East Small Finance Bank Limited",
                contact_us_link: "https://nesfb.com/GrievanceRedressalMechanism.php"
            },
            {
                bank_name: "Jana Small finance Bank Limited",
                contact_us_link: "https://www.janabank.com/grievance-redressal/"
            },
            {
                bank_name: "Shivalik Small Finance Bank Limited",
                contact_us_link: "https://shivalikbank.com/assets/pdf/Grievance-Redressal-Mechanism.pdf"
            },
            {
                bank_name: "Unity Small Finance Bank Limited",
                contact_us_link: "https://theunitybank.com/docs/Details_of_Grievance_Redressal_Officer_and_Escalation_Matrix.pdf"
            }
        ]
    },
    {
        category_name: "Payments Banks (PBs)",
        bank_list: [
            {
                bank_name: "Airtel Payments Bank Limited",
                contact_us_link: "https://www.airtel.in/bank/static/contact-us"
            },
            {
                bank_name: "India Post Payments Bank Limited",
                contact_us_link: "https://www.ippbonline.com/web/ippb/complaints#:~:text= Write%20to%20Us%20at,the%20below%20complaint%20escalation%20matrix."
            },
            {
                bank_name: "Fino Payments Bank Limited",
                contact_us_link: "https://www.finobank.com/contact-us"
            },
            {
                bank_name: "Paytm Payments Bank Limited",
                contact_us_link: "https://www.paytmbank.com/Policies/Customer-Grievance-Redressal-Policy-for-Paytm-Payments-Bank.html#:~:text=Call%20us%20on%20Our%2024,to%20help%20resolve%20your%20query."
            },
            {
                bank_name: "Jio Payments Bank Limited",
                contact_us_link: "https://www.jiopaymentsbank.com/grievance-redressal"
            },
            {
                bank_name: "NSDL Payments Bank Limited",
                contact_us_link: "https://nsdlbank.com/customer_grievance_redressal.php"
            }
        ]
    },
    {
        category_name: "Foreign Banks",
        bank_list: [
            {
                bank_name: "AB Bank Limited",
                contact_us_link: "https://abbl.com/customer-services/complaint-cell/"
            },
            {
                bank_name: "Abu Dhabi Commercial Bank PJSC",
                contact_us_link: "https://www.adcb.com/en/get-in-touch/write-to-us/"
            },
            {
                bank_name: "American Express Banking Corp.",
                contact_us_link: "https://icm.aexp-static.com/Internet/IntlHomepage/japa/IN_en/shared/ pdfs/complaint-form.pdf?inav=in_sitefooter_company_information_complaints"
            },
            {
                bank_name: "Australia & New Zealand Banking Group Limited",
                contact_us_link: "https://www.anz.com.au/support/contact-us/complaints/"
            },
            {
                bank_name: "Barclays Bank Plc",
                contact_us_link: "https://www.barclays.in/home/grievance-redressal-mechanism/"
            },
            {
                bank_name: "Bank of America",
                contact_us_link: "https://bofa-india.com/contactus.html"
            },
            {
                bank_name: "Bank of Bahrain and Kuwait B.S.C.",
                contact_us_link: "https://www.bbkindia.com/greviance-redressal-mechanism"
            },
            {
                bank_name: "Bank of Ceylon",
                contact_us_link: "https://boc.lk/index.php?route=information/contact"
            },
            {
                bank_name: "Bank of China",
                contact_us_link: "https://www.bankofchina.com/in/en/bocinfo/ab6/202005/t20200514_17854532.html"
            },
            {
                bank_name: "Bank of Nova Scotia",
                contact_us_link: "https://www.scotiabank.com/global/en/country/india.html"
            },
            {
                bank_name: "BNP Paribas",
                contact_us_link: "https://www.bnpparibas.co.in/en/client-complaints/"
            },
            {
                bank_name: "Citibank N.A.",
                contact_us_link: "https://www.online.citibank.co.in/customerservice/home.htm?eOfferCode=INHOGNTHECONTU"
            },
            {
                bank_name: "Coöperatieve Centrale Raiffeisen-Boerenleenbank B.A.",
                contact_us_link: "https://www.rabobank.com/en/locate-us/asia-pacific/india/cooperatieve-rabobank-ua.html"
            },
            {
                bank_name: "Credit Agricole Corporate & Investment Bank",
                contact_us_link: "https://www.ca-cib.com/our-global-markets/asia-pacific/india"
            },
            {
                bank_name: "Credit Suisse A.G",
                contact_us_link: "https://www.credit-suisse.com/in/en/contact-form.html"
            },
            {
                bank_name: "CTBC Bank Co. Limited",
                contact_us_link: "https://www.ctbcbank.com/content/dam/cbminisite/IN/grievance-redressal-policy.html"
            },
            {
                bank_name: "DBS Bank India Limited",
                contact_us_link: "https://www.dbs.com/in/treasures/common/redressal-of-complaints-and-grievances.page"
            },
            {
                bank_name: "Deutsche Bank A.G.,",
                contact_us_link: "https://www.deutschebank.co.in/customer_feedback_new.html"
            },
            {
                bank_name: "Doha Bank Q.P.S.C",
                contact_us_link: "https://in.dohabank.com/contact-us/"
            },
            {
                bank_name: "Emirates NBD Bank PJSC",
                contact_us_link: "https://emiratesnbd.co.in/en-in/contact-us/?ref=footer"
            },
            {
                bank_name: "First Abu Dhabi Bank PJSC",
                contact_us_link: "https://www.bankfab.com/en-in/contact-us"
            },
            {
                bank_name: "FirstRand Bank Limited",
                contact_us_link: "https://www.firstrand.co.in/contact"
            },
            {
                bank_name: "Hong Kong and Shanghai Banking Corporation Limited",
                contact_us_link: "https://www.hsbc.co.in/help/feedback-and-complaints/grievance-redressal-mechanism/non-demat-accounts/"
            },
            {
                bank_name: "Industrial & Commercial Bank of China Limited",
                contact_us_link: "http://www.icbc-ltd.com/icbcltd/Contact%20Us/default.htm"
            },
            {
                bank_name: "Industrial Bank of Korea",
                contact_us_link: "https://global.ibk.co.kr/en/common/ContactUs"
            },
            {
                bank_name: "JP Morgan Chase Bank N.A.",
                contact_us_link: "https://www.jpmorgan.com/IN/en/contact-us"
            },
            {
                bank_name: "JSC VTB Bank",
                contact_us_link: "https://vtbindia.com/about-us/"
            },
            {
                bank_name: "KEB Hana Bank",
                contact_us_link: "https://global.1qbank.com/lounge/chennai/et/contact/index.html"
            },
            {
                bank_name: "Kookmin Bank",
                contact_us_link: "https://www.kbfg.com/Eng/about/global/asia/india.jsp"
            },
            {
                bank_name: "Krung Thai Bank Public Co.Limited",
                contact_us_link: "https://krungthai.com/en/content/contact-us"
            },
            {
                bank_name: "Mashreqbank PSC",
                contact_us_link: "https://www.mashreqbank.com/en/uae/personal/customer-care/complaints/"
            },
            {
                bank_name: "Mizuho Bank Limited",
                contact_us_link: "https://www.mizuhogroup.com/bank/locations/asia#india"
            },
            {
                bank_name: "MUFG Bank, Ltd",
                contact_us_link: "https://www.bk.mufg.jp/global/globalnetwork/asiaoceania/index.html"
            },
            {
                bank_name: "NatWest Markets ",
                contact_us_link: "https://www.natwestmarkets.in/help-you/grievance-redressal.html"
            },
            {
                bank_name: "PT Bank Maybank Indonesia TBK",
                contact_us_link: "https://maybank.co.in/Grievance.php"
            },
            {
                bank_name: "Qatar National Bank(Q.P.S.C.)",
                contact_us_link: "https://www.qnb.com/sites/qnb/qnbindia/page/en/encontactus.html"
            },
            {
                bank_name: "Sberbank",
                contact_us_link: "https://www.sberbank.co.in/grievance"
            },
            {
                bank_name: "SBM Bank(India) Limited",
                contact_us_link: "https://www.sbmbank.co.in/aboutus/grievance-redressal-mechanism.php"
            },
            {
                bank_name: "Shinhan Bank",
                contact_us_link: "https://www.shinhanglobal.com/global.shinhan#page=113606"
            },
            {
                bank_name: "Societe Generale India",
                contact_us_link: "https://www.societegenerale.asia/en/contact/"
            },
            {
                bank_name: "Standard Chartered Bank",
                contact_us_link: "https://www.sc.com/in/important-information/grievance-redressal/"
            },
            {
                bank_name: "Sumitomo Mitsui Banking Corporation",
                contact_us_link: "https://www.smbc.co.jp/asia/contact/"
            },
            {
                bank_name: "United Overseas Bank Limited",
                contact_us_link: "https://www.uobgroup.com/in/contact-us/index.page"
            },
            {
                bank_name: "Westpac Banking Corporation",
                contact_us_link: "https://www.westpac.com.au/contact-us/feedback-complaints/?fid= GL:GF:GF1:wbc:www:contact-us:feedback-complaints"
            },
            {
                bank_name: "Woori Bank",
                contact_us_link: "https://go.wooribank.com/in/hs/cc/HSCC300_01L.do"
            },
            {
                bank_name: "Sonali Bank Limited",
                contact_us_link: ""
            }
        ]
    },
    {
        category_name: "State Co-operative Banks",
        bank_list: [
            {
                bank_name: "The Andaman and Nicobar State Co - operative Bank Ltd.",
                contact_us_link: "https://www.anscbank.in/contact-us/"
            },
            {
                bank_name: "The Andhra Pradesh State Co - operative Bank Ltd.",
                contact_us_link: "https://www.apcob.org/contact/"
            },
            {
                bank_name: "The Arunachal Pradesh State co - operative Apex Bank Ltd.",
                contact_us_link: "https://www.arunachalapexbank.com/contact.php"
            },
            {
                bank_name: "The Assam Co - operative Apex Bank Ltd.",
                contact_us_link: "https://www.apexbankassam.com/contact-us.php"
            },
            {
                bank_name: "The Bihar State Co - operative Bank Ltd.",
                contact_us_link: "http://bscb.co.in/Contact.htm"
            },
            {
                bank_name: "The Chandigarh State Co - operative Bank Ltd.",
                contact_us_link: "https://cscbapex.com/contact-us/"
            },
            {
                bank_name: "The Chhattisgarh Rajya Sahakari Bank Maryadit	",
                contact_us_link: "https://www.cgapexbank.com/complains.php	 "
            },
            {
                bank_name: "The Goa State Co - operative Bank Ltd.",
                contact_us_link: "https://gscbgoa.com/contact-us/"
            },
            {
                bank_name: "Gujarat State Co - operative Bank Ltd.",
                contact_us_link: "https://gscbank.co.in/contact/"
            },
            {
                bank_name: "The Haryana State Co - operative Apex Bank Ltd.",
                contact_us_link: "https://harcobank.org.in/contactus"
            },
            {
                bank_name: "The Himachal Pradesh State Co - operative Bank Ltd.",
                contact_us_link: "https://hpscb.com/contact-us/"
            },
            {
                bank_name: "Jharkhand State Co - operative Bank Ltd.",
                contact_us_link: "https://www.jscb.gov.in/PageContent.aspx?Id=8YtEYlKTcq4="
            },
            {
                bank_name: "The Karnataka State Co - operative Apex Bank Ltd.",
                contact_us_link: "https://www.karnatakaapex.com/new/index.php/en/contact-us"
            },
            {
                bank_name: "The Kerala State Co - operative Bank Ltd.",
                contact_us_link: "https://keralacobank.com/contact-2/"
            },
            {
                bank_name: "The Madhya Pradesh Rajya Sahakari Bank Maryadit	",
                contact_us_link: "https://www.apexbank.in/EnquiryForm.aspx"
            },
            {
                bank_name: "The Maharashtra State Co - operative Bank Ltd.",
                contact_us_link: "https://www.mscbank.com/FeedbackForm.aspx"
            },
            {
                bank_name: "The Manipur State Co - operative Bank Ltd.",
                contact_us_link: "https://mscbmanipur.in/?page_id=847"
            },
            {
                bank_name: "The Meghalaya Co - operative Apex Bank Ltd.",
                contact_us_link: "http://megcab.com/Contact%20Us.html"
            },
            {
                bank_name: "The Mizoram Co - operative Apex Bank Ltd.",
                contact_us_link: "https://www.mizoapex.com/contact-us.php"
            },
            {
                bank_name: "The Nagaland State Co - operative Bank Ltd.",
                contact_us_link: "https://nscb.co.in/contact-us/"
            },
            {
                bank_name: "The Odisha State Co - operative Bank Ltd.",
                contact_us_link: "https://www.odishascb.com/contactus.php"
            },
            {
                bank_name: "The Puducherry State Co - operative Bank Ltd.",
                contact_us_link: "https://mypscbank.com/contact.php"
            },
            {
                bank_name: "The Punjab State Co - operative Bank Ltd.",
                contact_us_link: "https://pscb.in/CustomerServices/Complaint.aspx"
            },
            {
                bank_name: "The Rajasthan State Co - operative Bank Ltd.",
                contact_us_link: "https://www.rscb.org.in/Contact"
            },
            {
                bank_name: "The Sikkim State Co - operative Bank Ltd.",
                contact_us_link: "https://siscobank.com/Public/GetinTouch/Redressal"
            },
            {
                bank_name: "The Tamil Nadu State Apex Co - operative Bank Ltd.",
                contact_us_link: "https://www.tnscbank.com/contact-us/contact-address/"
            },
            {
                bank_name: "The Telangana State Cooperative Apex Bank Ltd.",
                contact_us_link: "https://tscab.org/apex-bank-departments/"
            },
            {
                bank_name: "Tripura State Co - operative Bank Ltd.",
                contact_us_link: "https://tscbank.nic.in/contact.htm"
            },
            {
                bank_name: "The Uttar Pradesh Co - operative Bank Ltd.",
                contact_us_link: "http://www.upcbl.in/contactus.html"
            },
            {
                bank_name: "The Uttarakhand State Co - operative Bank Ltd.",
                contact_us_link: "https://www.ukstcbank.com/contact-us/"
            },
            {
                bank_name: "The West Bengal State Co - operative Bank Ltd.",
                contact_us_link: "https://www.wbstcb.com/page/contact_us"
            },
            {
                bank_name: "The Daman and Diu State Co - operative Bank Ltd.",
                contact_us_link: "https://3dcoopbank.in/contact#"
            },
            {
                bank_name: "The Delhi State Co - operative Bank Ltd.",
                contact_us_link: ""
            },
            {
                bank_name: "The Jammu and Kashmir State Co - operative Bank Ltd.",
                contact_us_link: "Mr.Manzoor Ahmad Bhat, Head Grievance Redresal Committee, Mob 9419647660"
            }
        ]
    },
    {
        category_name: "Scheduled Urban Co-operative Banks",
        bank_list: [
            {
                bank_name: "Ahmedabad Mercantile Co-Op Bank Ltd.",
                contact_us_link: "https://amcobank.com/n/complaint-form"
            },
            {
                bank_name: "Kalupur Commercial Coop.Bank Ltd.",
                contact_us_link: "https://www.kalupurbank.com/contact-us/"
            },
            {
                bank_name: "Mehsana Urban Co-Op Bank Ltd.",
                contact_us_link: "https://www.mucbank.com/mucb/branchnetwork"
            },
            {
                bank_name: "Nutan Nagarik Sahakari Bank Ltd., Ahmedabad",
                contact_us_link: "https://www.nutanbank.com/grievances-redressal.html"
            },
            {
                bank_name: "Rajkot Nagrik Sahakari Bank Ltd.",
                contact_us_link: "https://rnsbindia.com/atlas/branches.php"
            },
            {
                bank_name: "SBPP Co-operative Bank Ltd., Killa Pardi, Dist Valsad (Gujarat)",
                contact_us_link: "http://www.pardipeoplesbank.in/contact-us/"
            },
            {
                bank_name: "Surat Peoples Coop Bank Ltd",
                contact_us_link: "https://spcbl.in/dp-grievances/"
            },
            {
                bank_name: "Amanath Co-operative Bank Ltd. Bangalore",
                contact_us_link: "https://www.amanath-bank.com/contactus.html"
            },
            {
                bank_name: "Andhra Pradesh Mahesh Co-Op Urban Bank Ltd.",
                contact_us_link: "https://www.apmaheshbank.com/contactus.aspx"
            },
            {
                bank_name: "Indian Mercantile Co-operative Bank Ltd.",
                contact_us_link: "https://imcbankltd.com/complaint/"
            },
            {
                bank_name: "Abhyudaya Co-operative Bank Ltd., Mumbai",
                contact_us_link: "https://www.abhyudayabank.co.in/english/Contact.aspx"
            },
            {
                bank_name: "Apna Sahakari Bank Ltd.",
                contact_us_link: "https://www.apnabank.co.in/contactus/suggestionform.php"
            },
            {
                bank_name: "Bassein Catholic Co-operative Bank Ltd.",
                contact_us_link: "https://www.bccb.co.in/ContactUs.aspx"
            },
            {
                bank_name: "Bharat Co-operative Bank (Mumbai) Ltd., Mumbai",
                contact_us_link: "https://www.bharatbank.com/dynamic/CustomerFeedback.aspx"
            },
            {
                bank_name: "Bharati Sahakari Bank Limited.",
                contact_us_link: "https://bharatibankpune.com/contact/"
            },
            {
                bank_name: "Bombay Mercantile Co-operative Bank Limited",
                contact_us_link: "https://www.bmcbankltd.com/complaint.php"
            },
            {
                bank_name: "Citizen Credit Co-operative Bank Ltd., Mumbai",
                contact_us_link: "https://citizencreditbank.com/mybank/customer-care"
            },
            {
                bank_name: "Cosmos Co-operative Bank Ltd",
                contact_us_link: "https://www.cosmosbank.com/contact-us.aspx"
            },
            {
                bank_name: "Dombivli Nagari Sahakari Bank Ltd.",
                contact_us_link: "https://www.dnsbank.in//Encyc/2016/8/5/Complaint-Redressal.html"
            },
            {
                bank_name: "G. P. Parsik Janata Sahakari Bank Ltd., Thane",
                contact_us_link: "https://gpparsikbank.com/contact-us.html"
            },
            {
                bank_name: "Greater Bombay Co-operative Bank Limited",
                contact_us_link: "https://greaterbank.com/consumer_complaints"
            },
            {
                bank_name: "GS Mahanagar Co-operative Bank Ltd., Mumbai",
                contact_us_link: "https://mahanagarbank.net/contact.aspx"
            },
            {
                bank_name: "Jalgaon Janata Sahakari Bank Ltd",
                contact_us_link: "https://www.jjsbl.com/customer_help.php?pageid=Nw=="
            },
            {
                bank_name: "Jalgaon People's Co-operative Bank Ltd.",
                contact_us_link: "https://www.jpcbank.com/customer-complaints"
            },
            {
                bank_name: "Janakalyan Sahakari Bank Ltd., Mumbai",
                contact_us_link: "https://www.jsblbank.com/contact-us/"
            },
            {
                bank_name: "Janalaxmi Co-operative Bank Ltd., Nashik",
                contact_us_link: "http://www.janalaxmibank.com/contactus.html"
            },
            {
                bank_name: "Janata Sahakari Bank Ltd., Pune.",
                contact_us_link: "https://customercare.jsbnet.in/redressalcomplaint/add"
            },
            {
                bank_name: "Kallappanna Awade Ichalkaranji Janata Sahakari Bank Ltd.",
                contact_us_link: "https://www.ijsbank.com/feedback"
            },
            {
                bank_name: "Kalyan Janata Sahakari Bank Ltd., Kalyan",
                contact_us_link: "https://kalyanjanata.in/contact"
            },
            {
                bank_name: "Kapol Co-operative Bank Ltd., Mumbai",
                contact_us_link: "http://www.kapolbank.com/contact_us.html"
            },
            {
                bank_name: "Karad Urban Co-operative Bank Ltd.",
                contact_us_link: "https://www.karadurbanbank.com/"
            },
            {
                bank_name: "Nagar Urban Co-operative Bank Ltd., Ahmednagar",
                contact_us_link: "https://nucb.in/contact-us"
            },
            {
                bank_name: "Nasik Merchant's Co-operative Bank Ltd.",
                contact_us_link: "https://namcobank.in/namco/complaintform"
            },
            {
                bank_name: "New India Co-operative Bank Ltd., Mumbai",
                contact_us_link: "https://www.newindiabank.in/consumer_grievance.html"
            },
            {
                bank_name: "NKGSB Co-operative Bank Ltd., Mumbai",
                contact_us_link: "https://www.nkgsb-bank.com/grievance-redressal.php"
            },
            {
                bank_name: "Pravara Sahakari Bank Ltd.",
                contact_us_link: "https://pravarabank.com/complaints/"
            },
            {
                bank_name: "Punjab & Maharashtra Co-operative Bank Ltd.",
                contact_us_link: "https://www.pmcbank.com/english/GrievanceForm.aspx"
            },
            {
                bank_name: "Rajarambapu Sahakari Bank Ltd.",
                contact_us_link: "https://www.rajarambapubank.org/contact-us"
            },
            {
                bank_name: "Rupee Co-operative Bank Ltd.",
                contact_us_link: "http://www.rupeebank.com/"
            },
            {
                bank_name: "Sangli Urban Co-operative Bank Ltd., Sangli",
                contact_us_link: "https://www.sangliurbanbank.in/grivances.html"
            },
            {
                bank_name: "Saraswat Co-operative Bank Ltd., Bombay",
                contact_us_link: "https://www.saraswatbank.com/feedback.aspx?id=Feedback"
            },
            {
                bank_name: "Shamrao Vithal Co-operative Bank Ltd.",
                contact_us_link: "https://www.svcbank.com/Home/Grievances"
            },
            {
                bank_name: "Solapur Janata Sahakari Bank Ltd.",
                contact_us_link: "https://sjsbbank.com/contactus.php?parent=131"
            },
            {
                bank_name: "Thane Bharat Sahakari Bank Ltd.",
                contact_us_link: "https://tbsbl.org/page/contact"
            },
            {
                bank_name: "TJSB Sahakari Bank",
                contact_us_link: "https://www.tjsbbank.co.in/Customer_care"
            },
            {
                bank_name: "Vasai Vikas Sahakari Bank Ltd.",
                contact_us_link: "https://www.vasaivikasbank.com/contactus.html"
            },
            {
                bank_name: "Zoroastrian Co-operative Bank Ltd., Bombay",
                contact_us_link: "https://www.zoroastrianbank.com/contact.aspx"
            },
            {
                bank_name: "Nagpur Nagrik Sahakari Bank Ltd",
                contact_us_link: "https://www.nnsbank.co.in/index.php"
            },
            {
                bank_name: "Shikshak Sahakari Bank Ltd., Nagpur",
                contact_us_link: "https://www.shikshakbank.com/contact/"
            },
            {
                bank_name: "The Akola Janata Commercial Co-operative Bank Ltd., Akola.",
                contact_us_link: "https://www.akolajanatabank.com/cnt.php"
            },
            {
                bank_name: "The Akola Urban Co-operative Bank Ltd., Akola.",
                contact_us_link: "https://www.akolaurbanbank.com/contact-us.php"
            },
            {
                bank_name: "The Khamgaon Urban Co-operative Bank Ltd., Khamgaon",
                contact_us_link: "https://www.khamgaonbank.in/contact-form-2.html"
            },
            {
                bank_name: "Goa Urban Co-operative Bank Limited.",
                contact_us_link: "https://www.gucb.co.in/customer-care.php"
            }
        ]
    },
    {
        category_name: "Regional Rural Banks",
        bank_list: [
            {
                bank_name: "Andhra Pragathi Grameena Bank",
                contact_us_link: "https://www.apgb.in/Ex-gratia-Grievances.php"
            },
            {
                bank_name: "Chaitanya Godavari Grameena Bank",
                contact_us_link: "https://cggb.in/contact"
            },
            {
                bank_name: "Saptagiri Grameena Bank",
                contact_us_link: "https://www.saptagirigrameenabank.in/contact.php"
            },
            {
                bank_name: "Andhra Pradesh Grameena Vikas Bank*",
                contact_us_link: "https://www.apgvbank.in/contact-us.php"
            },
            {
                bank_name: "Telangana Grameena Bank",
                contact_us_link: "https://tgbhyd.in/#/complaints"
            },
            {
                bank_name: "Assam Gramin Vikash Bank",
                contact_us_link: "https://www.agvbank.co.in/"
            },
            {
                bank_name: "Arunachal Pradesh Rural Bank",
                contact_us_link: "https://apruralbank.co.in/contact.php"
            },
            {
                bank_name: "Uttar Bihar Gramin Bank",
                contact_us_link: "http://www.ubgb.in/contactus.aspx"
            },
            {
                bank_name: "Dakshin Bihar Gramin Bank",
                contact_us_link: "https://dbgb.in/welcome/complain"
            },
            {
                bank_name: "Chhattisgarh Rajya Gramin Bank",
                contact_us_link: "https://www.cgbank.in/Home/AddNew"
            },
            {
                bank_name: "Saurashtra Gramin Bank",
                contact_us_link: "https://sgbrrb.org/contact-us.html"
            },
            {
                bank_name: "Baroda Gujarat Gramin Bank",
                contact_us_link: "https://www.bggb.in/complaints.php"
            },
            {
                bank_name: "Sarva Haryana Gramin Bank",
                contact_us_link: "http://www.shgb.co.in/contact.html"
            },
            {
                bank_name: "Himachal Pradesh Gramin Bank",
                contact_us_link: "https://www.hpgb.in/grievance"
            },
            {
                bank_name: "Jharkhand Rajya Gramin Bank",
                contact_us_link: "https://www.jrgb.in/complaints.php"
            },
            {
                bank_name: "J&K Grameen Bank",
                contact_us_link: "https://www.jkgb.in/grievance.aspx"
            },
            {
                bank_name: "Ellaquai Dehati Bank",
                contact_us_link: "https://www.edb.org.in/contact-us.php"
            },
            {
                bank_name: "Karnataka Gramin Bank",
                contact_us_link: "https://karnatakagraminbank.com/complaints-grievances"
            },
            {
                bank_name: "Karnataka Vikas Grameena Bank",
                contact_us_link: "https://ogrs.kvgbank.com/"
            },
            {
                bank_name: "Kerala Gramin Bank",
                contact_us_link: "https://connect.keralagbank.com/Default.aspx?aspxerrorpath=/default.aspx"
            },
            {
                bank_name: "Maharashtra Gramin Bank",
                contact_us_link: "https://www.mahagramin.in/ComplaintsGrievances"
            },
            {
                bank_name: "Vidharbha Konkan Gramin Bank",
                contact_us_link: "https://www.vkgb.co.in/#/contact"
            },
            {
                bank_name: "Madhya Pradesh Gramin Bank",
                contact_us_link: "https://mpgb.co.in/contactus.php"
            },
            {
                bank_name: "Madhyanchal Gramin Bank",
                contact_us_link: "https://www.mgbank.co.in/complaint.php"
            },
            {
                bank_name: "Manipur Rural Bank",
                contact_us_link: "https://manipurruralbank.com/contact-us/"
            },
            {
                bank_name: "Meghalaya Rural Bank",
                contact_us_link: "http://meghalayaruralbank.co.in/contact-us"
            },
            {
                bank_name: "Mizoram Rural Bank",
                contact_us_link: "https://mizoramruralbank.in/contact-us.html"
            },
            {
                bank_name: "Nagaland Rural Bank",
                contact_us_link: "https://www.nagalandruralbank.com/"
            },
            {
                bank_name: "Odisha Gramya Bank",
                contact_us_link: "https://odishabank.in/contactus"
            },
            {
                bank_name: "Utkal Grameen Bank",
                contact_us_link: "https://www.utkalgrameenbank.co.in/contact.php"
            },
            {
                bank_name: "Punjab Gramin Bank",
                contact_us_link: "https://pgb.org.in/contact-us/"
            },
            {
                bank_name: "Puduvai Bharathiar Grama Bank",
                contact_us_link: "https://puduvaibharathiargramabank.in/contact-us/"
            },
            {
                bank_name: "Baroda Rajasthan Kshetriya Gramin Bank",
                contact_us_link: "https://brkgb.com/contact.php"
            },
            {
                bank_name: "Rajasthan Marudhara Gramin Bank",
                contact_us_link: "https://www.rmgb.in/complaintBox.php"
            },
            {
                bank_name: "Tamil Nadu Grama Bank",
                contact_us_link: "https://www.tamilnadugramabank.com/feedback"
            },
            {
                bank_name: "Tripura Gramin Bank",
                contact_us_link: "https://www.tripuragraminbank.org/CustomerGrivance.html"
            },
            {
                bank_name: "Aryavart Bank",
                contact_us_link: "http://www.aryavart-rrb.com/contact.html"
            },
            {
                bank_name: "Baroda UP Bank",
                contact_us_link: "https://www.barodaupbank.in/complaint.php"
            },
            {
                bank_name: "Prathama UP Gramin Bank",
                contact_us_link: "https://prathamaupbank.com/Grievance.aspx"
            },
            {
                bank_name: "Uttarakhand Gramin Bank",
                contact_us_link: "https://www.uttarakhandgraminbank.com/additional/complaint.html"
            },
            {
                bank_name: "Bangiya Gramin Vikash Bank",
                contact_us_link: "https://bgvb.in/Contact-Us.aspx"
            },
            {
                bank_name: "Paschim Banga Gramin Bank",
                contact_us_link: "https://www.pbgbank.com/complains"
            },
            {
                bank_name: "Uttarbanga Kshetriya Gramin Bank",
                contact_us_link: "http://www.ubkgb.org/contact_us.php"
            }
        ]
    },
    {
        category_name: "Financial Institutions",
        bank_list: [
            {
                bank_name: "National Bank for Agriculture and Rural Development",
                contact_us_link: "https://www.nabard.org/grievanceform.aspx"
            },
            {
                bank_name: "Export - Import Bank of India",
                contact_us_link: "https://www.eximbankindia.in/grievance-redressal"
            },
            {
                bank_name: "National Housing Bank",
                contact_us_link: "https://nhb.org.in/feedback/"
            },
            {
                bank_name: "Small Industries Development Bank of India",
                contact_us_link: "https://www.sidbi.in/en/online-enquiry/complaints"
            },
        ]
    }
]