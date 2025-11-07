class Solution {
public:
    vector<int> LPS(string &s) {
        int n = s.size();
        vector<int> ans(n, 0);
        int len = 0, i = 1;
        while (i < n) {
            if (s[i] == s[len]) {
                len++;
                ans[i] = len;
                i++;
            } else {
                if (len != 0) len = ans[len - 1];
                else {
                    ans[i] = 0;
                    i++;
                }
            }
        }
        return ans;
    }

    vector<int> search(string &pat, string &txt) {
        vector<int> lps = LPS(pat);
        vector<int> res;
        int m = pat.size(), n = txt.size();
        int i = 0, j = 0;

        while (i < n) {
            if (txt[i] == pat[j]) {
                i++;
                j++;
            }
            if (j == m) {
                res.push_back(i - j);   
                j = lps[j - 1];
            } else if (i < n && txt[i] != pat[j]) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return res;
    }
};
