// Returns the distance between the strings x and y.
module.exports = function (x, y) {
    let n = x.length, m = y.length;
    // create matrix and init i and j
    let matrix = [], i, j;
    // init first row and column
    for (i = 0; i <= m; i++) matrix[i] = [i];
    for (i = 0; i <= n; i++) matrix[0][i] = i;
    // fill in matrix
    for (i = 1; i <= m; i++) {
        for (j = 1; j <= n; j++) {
            let cost = 1;
            if (x.charAt(j - 1) === y.charAt(i - 1)) cost = 0;
            matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
        }
    }
    return matrix[m][n]
};