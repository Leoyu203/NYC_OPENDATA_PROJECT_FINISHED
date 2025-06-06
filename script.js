let data, info, leftPanel;

async function init(){
  let link = "https://data.cityofnewyork.us/resource/ic3t-wcy2.json?$limit=500";
  info = await fetch(link);
  data = await info.json();
  alert("Data loaded");
  leftPanel = document.getElementById("leftPanel");
  let build = "";
  
  
  for(let i = 0; i < data.length; i++){
    let job = data[i];
	let lat = job.gis_latitude;
	let lon = job.gis_longitude;
    build += `<div class="fitted card" style="height:300px;">`;
    build += `     <h3>Borough:${job.borough}</h3>`;
    build += `     <p>First Name:${job.applicant_s_first_name}</p>`;
    build += `     <p>Last Name:${job.applicant_s_last_name}</p>`;
	build += `     <p>Job Type:${job.job_type}</p>`;
	build += `     <p>Job Status:${job.job_status_descrp}</p>`;
	  
	if(lat && lon){
      build += `<input type='button' value='Map' onclick="showMap( ${lat},${lon} )">`;
    }
    build += `</div>`;
  }
  
  //Display results
  leftPanel.innerHTML = build;  
}



function getJobs(){
  let borough = document.getElementById("borough").value;
  let build = "";
  for(let i = 0; i < data.length; i++){
    let job = data[i];
	let lat = job.gis_latitude;
    let lon = job.gis_longitude;
	if(job.borough == borough){
      build += `<div class="fitted card" style="height:300px;">`;
      build += `     <h3>Borough:${job.borough}</h3>`;
      build += `     <p>First Name:${job.applicant_s_first_name}</p>`;
      build += `     <p>Last Name:${job.applicant_s_last_name}</p>`;
	  build += `     <p>Job Type:${job.job_type}</p>`;
	  build += `     <p>Job Status:${job.job_status_descrp}</p>`;
	  
	  if(job.gis_latitude && job.gis_latitude){
        build += `<input type='button' value='Map' onclick="showMap( ${lat},${lon} )">`;
      }
      build += `</div>`;
  }
  }
  //Display results
  leftPanel.innerHTML = build;  

}

function getTypes(){
  let type = document.getElementById("jobtype").value;
  let build = "";
  for(let i = 0; i < data.length; i++){
    let job = data[i];
	let lat = job.gis_latitude;
    let lon = job.gis_longitude;
	if(job.job_type == type){
      build += `<div class="fitted card" style="height:300px;">`;
      build += `     <h3>Borough:${job.borough}</h3>`;
      build += `     <p>First Name:${job.applicant_s_first_name}</p>`;
      build += `     <p>Last Name:${job.applicant_s_last_name}</p>`;
	  build += `     <p>Job Type:${job.job_type}</p>`;
	  build += `     <p>Job Status:${job.job_status_descrp}</p>`;
	  
	  if(job.gis_latitude && job.gis_latitude){
        build += `<input type='button' value='Map' onclick="showMap( ${lat},${lon} )">`;
      }
      build += `</div>`;
  }
  }
  //Display results
  leftPanel.innerHTML = build;  

}




function ByBorough(){
  //Create and initialize variables to keep a count of complaints by agency.
  let bronx = 0, queens = 0, brooklyn = 0, manhattan=0 , other = 0;

  //Task 1: Traverse the data and increment the appropriate tally variable using the agency of the complaint. Use the tally variable "other" to capture all the other agencies.
  for(let i = 0; i < data.length; i++){
    let jobs = data[i];
    if(jobs.borough == "BRONX"){
      bronx++;
    }else if(jobs.borough == "QUEENS"){
      queens++;
    }else if(jobs.borough == "BROOKLYN"){
      brooklyn++;
	}else if(jobs.borough == "MANHATTAN"){
      manhattan++;
    }else other++; 
  }
  //Task 2: Construct the chart data using the full agency name. (Hint: Go to the data source)
  let chartData = [
      ["BRONX", bronx],
      ["QUEENS", queens],
      ["BROOKLYN", brooklyn],
	  ["MANHATTAN", manhattan],
      ["OTHER", other]
    ]

  //Task 3: Retrieve the chart type from the user via the drop down menu
  let chartType = document.getElementById("chartType").value;

  //Task 4: Display the chart of the breakdown of complaints by agency.
  displayChart(chartData, "chart", chartType);
}


// displayChart() accepts the data, an id of the container where to display the chart, and the type of chart to display in the container.
function displayChart( data, chart_id, chart_type ){
  let chart = c3.generate({
    bindto: `#${chart_id}`,
    data: {
      columns: data,
      type: chart_type
    }
  });
}
