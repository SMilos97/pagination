const baseUrl = "https://api.coinranking.com/v2/coins";
const proxyUrl = "https://protected-sea-17533.herokuapp.com/";

let coinsData = [];
let minPage = 1;
let curPage = 1;
let maxPage;
let itemsPerPage = 6;
let k;

document.getElementById("brStranice").innerHTML = curPage;

async function getData() {
  const res = await fetch(proxyUrl + baseUrl);
  const coins = await res.json();

  coinsData = coins.data.coins;
}

async function renderTable(page = 1) {
  await getData();
  if ((coinsData.length / itemsPerPage) % 2 != 0) {
    maxPage = parseInt(coinsData.length / itemsPerPage) + 1;
  } else {
    maxPage = coinsData.length / itemsPerPage;
  }

  let ispis = "";

  coinsData
    .filter((elem, index) => {
      let start = (curPage - 1) * itemsPerPage;
      let end = curPage * itemsPerPage;

      if (index >= start && index < end) return true;
    })
    .forEach((coin) => {
      ispis += `<tr> 
<td> ${coin.rank}</td>
<td>${coin.name} </td>
<td> ${coin.price}</td>
<td> ${coin.marketCap}</td>
<td>${coin.symbol}</td>
</tr>`;
    });

  document.getElementById("data").innerHTML = ispis;
}

let numberOfPage = document.querySelectorAll(".page-link");

numberOfPage.forEach((element) => {
  element.addEventListener("click", movePage);
});
renderTable();


document.getElementById("previous").addEventListener("click", previousPage);

function previousPage(){let numberLastPage = parseInt(coinsData.length / pagseSize);
if (curPage > 1) {
    curPage--;
    if(curPage > 3 && curPage < (numberLastPage-2)){
        firstNumber.innerHTML = curPage-2;
        secondNumber.innerHTML = curPage-1;
        thirdNumber.innerHTML = curPage;
        fourthNumber.innerHTML = curPage+1;
        fifthNumber.innerHTML = curPage+2;
    }
    if(curPage <= 3){
        firstNumber.innerHTML = 1;
        secondNumber.innerHTML = 2;
        thirdNumber.innerHTML = 3;
        fourthNumber.innerHTML = 4;
        fifthNumber.innerHTML = 5;
    }
    
}
rendertable(curPage);

}

document.getElementById("next").addEventListener("click", nextPage);


function nextPage() {
    let numberLastPage = parseInt(coinsData.length / pagseSize);
    
    if ((curPage * pagseSize) < coinsData.length) {
        curPage++;
        if(curPage > 3 && curPage < 8){
            firstNumber.innerHTML = curPage-2;
            secondNumber.innerHTML = curPage-1;
            thirdNumber.innerHTML = curPage;
            fourthNumber.innerHTML = curPage+1;
            fifthNumber.innerHTML = curPage+2;
        }
        if(curPage >=(numberLastPage-2)){
            firstNumber.innerHTML = numberLastPage-4;
            secondNumber.innerHTML = numberLastPage-3;
            thirdNumber.innerHTML = numberLastPage-2;
            fourthNumber.innerHTML = numberLastPage-1;
            fifthNumber.innerHTML = numberLastPage;
        }
        rendertable(curPage);
    }


}

let numberPaginacija = document.querySelectorAll('.number');

numberPaginacija.forEach(elem=>{
    elem.addEventListener('click', paginacijaFnc)
})

function paginacijaFnc() {
    let numberLastPage = parseInt(coinsData.length / pagseSize);
    let number = this.innerHTML;
    curPage = parseInt(number);
    if(curPage<3){
        firstNumber.innerHTML = 1;
        secondNumber.innerHTML = 2;
        thirdNumber.innerHTML = 3;
        fourthNumber.innerHTML = 4;
        fifthNumber.innerHTML = 5;
    }else if(curPage>=(numberLastPage-2)){
        firstNumber.innerHTML = numberLastPage-4;
        secondNumber.innerHTML = numberLastPage-3;
        thirdNumber.innerHTML = numberLastPage-2;
        fourthNumber.innerHTML = numberLastPage-1;
        fifthNumber.innerHTML = numberLastPage;
    }else{
        firstNumber.innerHTML = curPage - 2;
        secondNumber.innerHTML = curPage - 1;
        thirdNumber.innerHTML = curPage;
        fourthNumber.innerHTML = curPage + 1;
        fifthNumber.innerHTML = curPage + 2;
    }
    rendertable(curPage);
}


firstPage.addEventListener('click',()=>{

curPage = 1 ;

        firstNumber.innerHTML = curPage;
        secondNumber.innerHTML = curPage + 1;
        thirdNumber.innerHTML = curPage + 2;
        fourthNumber.innerHTML = curPage + 3;
        fifthNumber.innerHTML = curPage + 4;

rendertable(curPage);
})


lastPage.addEventListener('click',()=>{

curPage = Math.ceil(coinsData.length / pagseSize);
        firstNumber.innerHTML = curPage - 4;
        secondNumber.innerHTML = curPage - 3;
        thirdNumber.innerHTML = curPage - 2;
        fourthNumber.innerHTML = curPage - 1;
        fifthNumber.innerHTML = curPage;

rendertable(curPage);
});
