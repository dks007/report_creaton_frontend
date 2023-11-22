import React from "react";
import { useSearchParams } from "react-router-dom";

import CustomTabs from "../shared/common/CustomTabs";
import { STRING, detailsPageTab, } from "../../constants/static";
import OngoingReport from "./OngoingReport";
import HistoricReport from "./HistoricReport";

const IssueDetailsPage = () => {
  const [searchParams] = useSearchParams();
	const tab = searchParams.get("active");

  return (
    <div className="container-fluid">
      <h3>Issues Details Page</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="custom-box p-3">
            {/* Content in the left column */}
          </div>
        </div>
        <div className="col-md-8">
          <div className="custom-box">
            <CustomTabs
              tabs={detailsPageTab}
              defaultTab={STRING.ONGOING_REPORT}
              tabName={STRING.ACTIVE}
            />
            
            { tab === "ongoing-report" && <OngoingReport/>}
            { tab === "historical-report" && <HistoricReport/>}

            
          </div>
        </div>
      </div>

    </div>
  );
};

export default IssueDetailsPage;
