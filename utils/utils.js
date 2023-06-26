export function downloadFileExcel(response, title, type) {
  const typeExcel = type ?? "xls";
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = `${year}/${month}/${day}` || "";
  const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.setAttribute("download", `${title} ${date}.${typeExcel}`);
  downloadLink.target = "_blank";
  downloadLink.click();
  // Báo cáo chi tiết
}

export function sumFields(array) {
  const sums = {};

  // Lặp qua từng mảng trong mảng array
  for (let i = 0; i < array.length; i++) {
    const subArray = array[i];

    // Kiểm tra nếu subArray không phải null và không phải undefined
    if (subArray !== null && typeof subArray !== "undefined") {
      // Lặp qua từng đối tượng trong subArray
      for (let j = 0; j < subArray.length; j++) {
        const obj = subArray[j];
        const reasonName = obj.reasonName;
        const total = obj.total;

        // Kiểm tra nếu reasonName đã tồn tại trong sums
        if (sums[reasonName]) {
          sums[reasonName] += total;
        } else {
          sums[reasonName] = total;
        }
      }
    }
  }

  const result = [];

  // Chuyển sums thành mảng các đối tượng với field và total
  for (let key in sums) {
    result.push({
      reasonName: key,
      total: sums[key],
    });
  }

  return result;
}
