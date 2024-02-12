useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('issue-listing/', {
        params: {
          start: (currentPage - 1) * itemsPerPage, // Calculate start index
          max_result: itemsPerPage // Set max_result to fetch
        }
      });

      // Concatenate new data with existing data
      setIssueData(prevData => [...prevData, ...response.data.resdata]);
      setTotalRecords(response.data.total_record); // Set total records
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again later.');
      setLoading(false);
    }
  };

  fetchData();
}, [currentPage]); // Trigger fetchData on currentPage change
