import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import axiosInstance from "../../../axiosInstance/axiosInstance";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  selectFormControl: {
    minWidth: 240, // Adjust the minimum width of the Select dropdown as needed
  },
});
const FilterComp = ({ onFilterApply, onFilterReset }) => {
  const [filterValues, setFilterValues] = useState({
    jiraId: "",
    expertName: "",
    customer: "",
    menuCardId: "",
    csmPsm: "",
    sdm: "",
    sdo: "",
    issueCreatedDate: null, // null for date pickers
    assignedDate: null, // null for date pickers
    status: "",
    expertEmail: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [experts, setExperts] = useState([]);
  const [selectedExpertName, setSelectedExpertName] = useState("");

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axiosInstance.get("expertlist/");
        setExperts(response.data.resdata); // Assuming response.data is an array of {expert_name, expert_email}
      } catch (error) {
        console.error("Failed to fetch experts:", error);
        // Handle error (e.g., set error state, show notification)
      }
    };

    fetchExperts();
  }, []); // Empty dependency array to run once on component mount

  const handleClick = (filterType) => (event) => {
    setAnchorEl(event.currentTarget);
    setActiveFilter(filterType);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilterValues({
      jiraId: "",
      expertName: "",
      customer: "",
      menuCardId: "",
      csmPsm: "",
      sdm: "",
      sdo: "",
      issueCreatedDate: null,
      assignedDate: null,
      status: "",
      expertEmail: "",
    });
    navigate("/"); // Reset the URL when filters are cleared
  };

  const handleExpertChange = (event) => {
    const selectedEmail = event.target.value;
    const selectedExpert = experts.find(
      (expert) => expert.expert_email === selectedEmail
    );

    setFilterValues((prev) => ({ ...prev, expertName: selectedEmail }));

    if (selectedExpert) {
      setSelectedExpertName(selectedExpert.expert_name);
    } else {
      setSelectedExpertName("All");
    }

    handleClose();
  };

  const applyFilters = () => {
    if (Object.values(filterValues).every((value) => !value)) {
      toast.error("Please select a filter value");
      return;
    }

    const searchParams = new URLSearchParams(filterValues).toString();
    navigate(`?${searchParams}`); // Update the URL with selected filter values

    onFilterApply(filterValues);
    handleClose();
  };

  // Initialize filter values from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setFilterValues((fv) => ({
      ...fv,
      jiraId: searchParams.get("jiraId") || "",
      expertName: searchParams.get("expertName") || "",
    }));
  }, [location.search]);

  const handleClose = () => {
    setAnchorEl(null); // This should close the Menu
    setActiveFilter(""); // Reset active filter if you're using this to manage which Menu is open
  };

  const isMenuOpen = (filterType) =>
    Boolean(anchorEl) && activeFilter === filterType;

  return (
    <>
      {/* Jira ID Filter */}
      <div className="jira-filter-control added-value">
        <Button
          id="jira-filter"
          aria-controls="jira-menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen("jiraId") ? "true" : undefined}
          variant="contained"
          isableelevation="true"
          onClick={(event) => {
            console.log("Opening Jira ID menu"); // Debugging log
            handleClick("jiraId")(event);
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Jira ID: {filterValues.jiraId || "All"}
        </Button>
        <Menu
          id="jira-menu"
          className="filter-wrapper"
          anchorEl={anchorEl}
          open={isMenuOpen("jiraId")}
          onClose={() => {
            handleClose();
          }}
        >
          <MenuItem>
            <TextField
              variant="outlined"
              placeholder="Search Jira ID..."
              name="jiraId"
              value={filterValues.jiraId}
              onChange={handleInputChange}
              fullWidth
            />
          </MenuItem>
        </Menu>
      </div>

      {/* Expert Name Filter */}

      <div className="expert-filter-control">
        <Button
          aria-controls="expert-menu"
          id="expert-filter"
          aria-haspopup="true"
          aria-expanded={isMenuOpen("expertName") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("expertName")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Expert Name: {selectedExpertName || "All"}
        </Button>
        <Menu
          id="expert-menu"
          className="filter-wrapper"
          anchorEl={anchorEl}
          open={isMenuOpen("expertName")}
          onClose={handleClose}
        >
          <MenuItem>
            <FormControl fullWidth sx={{ minWidth: 180 }}>
              <InputLabel>Expert Name</InputLabel>
              <Select
                value={filterValues.expertEmail}
                onChange={handleExpertChange}
                displayEmpty
                inputProps={{ name: "expertEmail" }}
              >
                {experts.map((expert) => (
                  <MenuItem
                    key={expert.expert_email}
                    value={expert.expert_email}
                  >
                    {expert.expert_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MenuItem>
        </Menu>
      </div>

      {/* Customer Filter */}
      <div className="cus-filter-control">
        <Button
          id="cus-filter"
          aria-controls="cus-menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen("customer") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("customer")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Customer
        </Button>
        <Menu
          id="cus-menu"
          className="filter-wrapper"
          MenuListProps={{ "aria-labelledby": "cus-filter" }}
          anchorEl={anchorEl}
          open={isMenuOpen("customer")}
          onClose={handleClose}
        >
          <MenuItem>
            <TextField
              variant="outlined"
              name="customer"
              placeholder="Search Customer..."
              value={filterValues.customer}
              onChange={handleInputChange}
              fullWidth
            />
          </MenuItem>
        </Menu>
      </div>
      {/* menu card Filter */}
      <div className="menu-filter-control">
        <Button
          id="menu-filter"
          aria-controls={isMenuOpen("menuCardId") ? "menu-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen("menuCardId") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("menuCardId")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Menu Card ID
        </Button>
        <Menu
          id="menu-menu"
          className="filter-wrapper"
          MenuListProps={{ "aria-labelledby": "menu-filter" }}
          anchorEl={anchorEl}
          open={isMenuOpen("menuCardId")}
          onClose={handleClose}
        >
          <MenuItem>
            <TextField
              variant="outlined"
              name="menuCardId"
              placeholder="Search Menu Card ID..."
              value={filterValues.menuCardId}
              onChange={handleInputChange}
              fullWidth
            />
          </MenuItem>
        </Menu>
      </div>
      {/* csm/psm  Filter */}
      <div className="csm-filter-control">
        <Button
          id="csm-filter"
          aria-controls={isMenuOpen("csmPsm") ? "csm-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen("csmPsm") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("csmPsm")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          CSM / PSM
        </Button>
        <Menu
          id="csm-menu"
          className="filter-wrapper"
          MenuListProps={{ "aria-labelledby": "csm-filter" }}
          anchorEl={anchorEl}
          open={isMenuOpen("csmPsm")}
          onClose={handleClose}
        >
          <MenuItem>
            <TextField
              variant="outlined"
              name="csmPsm"
              placeholder="Search CSM / PSM..."
              value={filterValues.csmPsm}
              onChange={handleInputChange}
              fullWidth
            />
          </MenuItem>
        </Menu>
      </div>

      {/* SDM Filter */}
      <div className="sdm-filter-control">
        <Button
          id="sdm-filter"
          aria-controls="sdm-menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen("sdm") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("sdm")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          SDM
        </Button>
        <Menu
          id="sdm-menu"
          anchorEl={anchorEl}
          open={isMenuOpen("sdm")}
          onClose={handleClose}
        >
          <MenuItem>
            <TextField
              name="sdm"
              variant="outlined"
              placeholder="Search SDM..."
              value={filterValues.sdm}
              onChange={handleInputChange}
              fullWidth
            />
          </MenuItem>
        </Menu>
      </div>
      {/* SDO Filter */}
      <div className="sdo-filter-control">
        <Button
          id="sdo-filter"
          aria-controls={isMenuOpen("sdo") ? "sdo-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen("sdo") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("sdo")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          SDO
        </Button>
        <Menu
          id="sdo-menu"
          className="filter-wrapper"
          MenuListProps={{ "aria-labelledby": "sdo-filter" }}
          anchorEl={anchorEl}
          open={isMenuOpen("sdo")}
          onClose={handleClose}
        >
          <MenuItem>
            <TextField
              variant="outlined"
              name="sdo"
              placeholder="Search SDO..."
              value={filterValues.sdo}
              onChange={handleInputChange}
              fullWidth
            />
          </MenuItem>
        </Menu>
      </div>

      {/* Issue Created Date Filter */}
      <div className="created-filter-control">
        <Button
          id="created-filter"
          aria-controls={
            isMenuOpen("issueCreatedDate") ? "created-menu" : undefined
          }
          aria-haspopup="true"
          aria-expanded={isMenuOpen("issueCreatedDate") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("issueCreatedDate")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Issue Created Date
        </Button>
        <Menu
          id="created-menu"
          className="filter-wrapper"
          MenuListProps={{ "aria-labelledby": "created-filter" }}
          anchorEl={anchorEl}
          open={isMenuOpen("issueCreatedDate")}
          onClose={handleClose}
        >
          <MenuItem>
            <input
              type="date"
              name="issueCreatedDate"
              value={filterValues.issueCreatedDate || ""}
              onChange={(e) => handleInputChange(e)}
              className="date-input" // You can style this as needed
            />
          </MenuItem>
        </Menu>
      </div>

      {/* assign Date Filter */}
      <div className="assign-filter-control">
        <Button
          id="assign-filter"
          aria-haspopup="true"
          aria-expanded={isMenuOpen("assignedDate") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("assignedDate")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Assigned Date
        </Button>
        <Menu
          id="assign-menu"
          className="filter-wrapper"
          MenuListProps={{ "aria-labelledby": "assign-filter" }}
          anchorEl={anchorEl}
          open={isMenuOpen("assignedDate")}
          onClose={handleClose}
        >
          <MenuItem>
            <input
              type="date"
              name="assignedDate"
              value={filterValues.assignedDate || ""}
              onChange={(e) => handleInputChange(e)}
              className="date-input" // Ensure to style this class as needed
            />
          </MenuItem>
        </Menu>
      </div>
      {/* status Filter */}
      <div className="status-filter-control">
        <Button
          id="status-filter"
          aria-controls={isMenuOpen("status") ? "status-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen("status") ? "true" : undefined}
          variant="contained"
          onClick={(event) => handleClick("status")(event)}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Status: {filterValues.status || "All"}
        </Button>
        <Menu
          id="status-menu"
          className="filter-wrapper"
          MenuListProps={{ "aria-labelledby": "status-filter" }}
          anchorEl={anchorEl}
          open={isMenuOpen("status")}
          onClose={handleClose}
        >
          <MenuItem>
            <TextField
              name="status"
              variant="outlined"
              placeholder="Search Status..."
              value={filterValues.status}
              onChange={handleInputChange} // Direct usage, assuming handleInputChange can handle event directly.
              fullWidth
            />
          </MenuItem>
        </Menu>
      </div>
      <div className="filter-action-btn">
        <Button className="apply-filter" onClick={applyFilters}>
          APPLY
        </Button>
        <Button className="clear-filter" onClick={resetFilters}>
          Clear
        </Button>
      </div>
    </>
  );
};
export default FilterComp;
