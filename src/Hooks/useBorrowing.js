import useApi from './useApi';

const useBorrowing = () => {
    const { fetchData:removeBorrowing, data:deleteData, loading:deleteLoading, error:deleteError } = useApi([]);

    const deleteBorrowing = async (id) => {
        removeBorrowing({
            method: 'DELETE',
            url: `/borrowings/${id}`,
        })
    };

    return { deleteBorrowing, deleteError, deleteLoading, deleteData };
};
export default useBorrowing;