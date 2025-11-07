class Solution {
public:
    int partition(vector<int>& arr, int low, int high) {
        int pivot = arr[low]; 
        int i = low;
        int j = high;

        while (i < j) {
            while (arr[i] <= pivot && i <= high - 1) i++;
            while (arr[j] > pivot && j >= low) j--;

            if (i < j) {
                swap(arr[i], arr[j]);
            }
        }

        swap(arr[low], arr[j]); 
        return j; 
    }

    void quickSort(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pIndex = partition(arr, low, high);
            quickSort(arr, low, pIndex - 1);   
            quickSort(arr, pIndex + 1, high);  
        }
    }
};
