import useApi from "./useApi";

const useBorrowing = () => {
  const {
    fetchData: removeBorrowing,
    data: deleteData,
    loading: deleteLoading,
    error: deleteError,
  } = useApi([]);
  const {
    fetchData: returnBorrowing,
    data: returnData,
    loading: returnLoading,
    error: returnError,
  } = useApi([]);

  const deleteBorrowing = async (id) => {
    await removeBorrowing({
      method: "DELETE",
      endPoint: `/borrowings/${id}`,
    });
  };
  const confirmReturn = async (id, formData) => {
    returnBorrowing({
      method: "PUT",
      endPoint: `/borrowings/${id}`,
      data: formData,
    });
  };

  return {
    deleteBorrowing,
    deleteError,
    deleteLoading,
    deleteData,
    confirmReturn,
    returnData,
    returnError,
    returnLoading,
  };
};
export default useBorrowing;
