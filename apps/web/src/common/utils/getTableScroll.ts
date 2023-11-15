export default function getTableScroll({ extraHeight = null, ref }) {
  if (!extraHeight) {
    extraHeight = 108;
  }
  let tHeader = null;
  if (ref && ref.current) {
    tHeader = ref.current.getElementsByClassName('ant-table-thead')[0];
  } else {
    tHeader = document.getElementsByClassName('ant-table-thead')[0];
  }
  //表格内容距离顶部的距离
  let tHeaderBottom = 0;
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom;
  }
  // 窗体高度-表格内容顶部的高度-表格内容底部的高度
  // let height = document.body.clientHeight - tHeaderBottom - extraHeight
  console.log(tHeaderBottom);
  let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`;

  return height;
}
