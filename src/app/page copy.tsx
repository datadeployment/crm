"use client"
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


export default function PDFViewer(props: any) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [fileUrlData, setFileUrlData] = useState("")
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }


  return (
    <>
      <input type="file" accept=".pdf" onChange={e => {
        if (e && e.target && e.target.files) {
          setFileUrlData(URL.createObjectURL(e.target.files[0]))
        } else {
          setFileUrlData("")
        }
      }} />

      <div className="w-screen">
        <Document file={fileUrlData}
          onLoadSuccess={onDocumentLoadSuccess}

        >
          <Page
            onGetTextSuccess={({ items }: { items: any }) => {
              console.log(items)
              items.map((item: any, index: number) => {
                if (index === 438) {
                  // report_created
                  console.log("report_created", item.str)
                }

                if (index === 12) {
                  // name
                  console.log("name", item.str)
                }

                if (index === 16) {
                  // address
                  console.log("address", item.str)
                }

                if (index === 20) {
                  // dob
                  console.log("dob", item.str)
                }

                if (index === 24) {
                  // pan
                  console.log("pan", item.str)
                }

                if (index === 28) {
                  // telephone
                  console.log("telephone", item.str)
                }

                if (index === 32) {
                  // gender
                  console.log("gender", item.str)
                }

                if (index === 36) {
                  // passport
                  console.log("passport", item.str)
                }

                if (index === 40) {
                  // phone
                  console.log("phone", item.str)
                }

                if (index === 44) {
                  // email
                  console.log("email", item.str)
                }

                if (index === 48) {
                  // voter_id
                  console.log("voter_id", item.str)
                }

                if (index === 52) {
                  // driving_license
                  console.log("driving_license", item.str)
                }

                if (index === 56) {
                  // aadhaar_card
                  console.log("aadhaar_card", item.str)
                }

                if (index === 60) {
                  // ration_card
                  console.log("ration_card", item.str)
                }

                if (index === 66) {
                  // credit_score
                  console.log("credit_score", item.str)
                }
              })
            }}
            renderTextLayer={true}

            pageNumber={pageNumber}
          />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button type="button" onClick={() => goToNextPage()}>Next</button>
        <button type="button" onClick={() => goToPreviousPage()}>Previous</button>
      </div>


    </>
  );
}