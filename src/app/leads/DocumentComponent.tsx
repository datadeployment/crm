import React from 'react'
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
const DocumentComponent = ({ file, documentData }: { file: any, documentData: any }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    return (
        <div style={{ display: "none" }}>
            <Document file={file}
            //   onLoadSuccess={onDocumentLoadSuccess}

            >
                <Page
                    onGetTextSuccess={({ items }: { items: any }) => {
                        documentData(items)
                    }}
                    renderTextLayer={true}

                    pageNumber={1}
                />
            </Document>
        </div>
    )
}

export default DocumentComponent
