class Solution {
  public:
    vector<vector<int>> countFreq(vector<int>& arr) {
        map<int,int> freq;
        for (int x : arr) {
            freq[x]++;
        }
        
        vector<vector<int>> result;
        for (auto &it : freq) {
            result.push_back({it.first, it.second});
        }
        return result;
    }
};
