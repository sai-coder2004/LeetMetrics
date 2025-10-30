
document.addEventListener("DOMContentLoaded",function(){     // write all logic in this function it ensures first ui is loaded then js
  const username=document.getElementById("name");
  const button=document.getElementById("search_btn");
  const easy=document.getElementById("easy");
  const medium=document.getElementById("medium");
  const hard=document.getElementById("hard");
  const total=document.getElementById("total");
  const containe=document.querySelector(".container");
  function validateUsername(userName){
        if(userName.trim()===""){
            alert("User Name should not be Empty");
            return false;
        }
        const regex=/^[a-zA-Z0-9](?:[a-zA-Z0-9_-]{0,13}[a-zA-Z0-9])?$/;
        const isMatching=regex.test(userName);
        if(!isMatching){
              alert("Enter Valid user name");
        }
        return isMatching;

  }
  async function fetchUserData(baseUrl){
      const response=await fetch(baseUrl);
      let data= await response.json();
      return data;
  }
   button.addEventListener('click', async function(){
        const user=username.value;
        console.log(user);
        const flag=validateUsername(user);
        const baseUrl=`https://leetcode-stats-api.herokuapp.com/${user}`;
       if(flag){
        console.log("hi");
           const userData= await fetchUserData(baseUrl);
           console.log(userData);
           const acceptanceRate=userData.acceptanceRate;
           const contribution=userData.contributionPoints;
           const easySolved=userData.easySolved;
           const hardSolved=userData.hardSolved;
           const mediumSolved=userData.mediumSolved;
           const ranking=userData.ranking;
           const totalEasy=userData.totalEasy;
           const totalHard=userData.totalHard;
           const totalMedium=userData.totalMedium;
           const totalQuestions=userData.totalQuestions;
           const totalSolved=userData.totalSolved;
           const message=userData.message;
           const attributes=["easySolved","totalEasy","mediumSolved","totalMedium","hardSolved","totalHard","totalSolved","totalQuestions",
               "ranking","acceptanceRate","contributionPoints"
           ]
           if(message=="user does not exist"){
            alert("user does not exist");
           }
           else{
           const oldStats = containe.querySelector(".stats");
            if (oldStats) oldStats.remove();
           let fragment=document.createElement("div");
           fragment.classList.add("stats");
           for(let i in attributes){
                let para=document.createElement("p");
                para.textContent=attributes[i]+" : "+userData[attributes[i]];
                fragment.appendChild(para);
           }
           containe.append(fragment);
           const easyPercent=(easySolved/totalEasy)*100;
           const mediumPercent=(mediumSolved/totalMedium)*100;
           const hardPercent=(hardSolved/totalHard)*100;
           const totalPercent=(totalSolved/totalQuestions)*100;
           easy.style.setProperty("--progress-degree",`${easyPercent}%`);
           medium.style.setProperty("--progress-degree",`${mediumPercent}%`);
           hard.style.setProperty("--progress-degree",`${mediumPercent}%`);
           total.style.setProperty("--progress-degree",`${totalPercent}%`);
       }
    }
  });
});