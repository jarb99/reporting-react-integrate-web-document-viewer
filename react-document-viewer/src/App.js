import './App.css';
import { useEffect, useRef } from 'react';
import { DxReportViewer } from 'devexpress-reporting/dx-webdocumentviewer';
import { DxReportDesigner } from 'devexpress-reporting/dx-reportdesigner';
import * as ko from 'knockout';

const ReportDesigner = () => {
    const reportUrl = ko.observable("TestReport");
    const designerRef = useRef();
    const requestOptions = {
      host: "https://localhost:62359/",
      getDesignerModelAction: "DXXRD/GetDesignerModel"
    };
    useEffect(() => {
      const designer = new DxReportDesigner(designerRef.current, { reportUrl, requestOptions });
      designer.render(); 
      return () => designer.dispose();
    })
    return (<div ref={designerRef}></div>);
}

const ReportViewer = () => {
    const reportUrl = ko.observable("TestReport");
    const viewerRef = useRef();
    const requestOptions = {
        host: "https://localhost:62359/",
        invokeAction: "DXXRDV"
    };
    useEffect(() => {
        const viewer = new DxReportViewer(viewerRef.current, { reportUrl, requestOptions });
        viewer.render();
        return () => viewer.dispose();
    })
    return (<div ref={viewerRef}></div>);
}

function App() {
    return (<div style={{ width: "100%", height: "1000px" }}>
        {/* <ReportViewer /> */}
        <ReportDesigner />
    </div>);
}

export default App;