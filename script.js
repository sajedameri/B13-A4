

let jobs = [
    {id:1, company:"Metro Tech", position:"Frontend Developer", location:"Dhaka", type:"Full-time", salary:"50k-70k", description:"Develop responsive web apps.", status:"all"},
    {id:2, company:"WebNest", position:"UI Designer", location:"Remote", type:"Part-time", salary:"30k-45k", description:"Design clean UI layouts.", status:"all"},
    {id:3, company:"CloudSoft", position:"Backend Developer", location:"Chittagong", type:"Full-time", salary:"60k-80k", description:"Build REST APIs.", status:"all"},
    {id:4, company:"TechNova", position:"React Developer", location:"Dhaka", type:"Full-time", salary:"55k-75k", description:"Create SPA applications.", status:"all"},
    {id:5, company:"AppWorks", position:"Mobile Developer", location:"Remote", type:"Contract", salary:"40k-60k", description:"Develop Android apps.", status:"all"},
    {id:6, company:"DataLab", position:"Data Analyst", location:"Dhaka", type:"Full-time", salary:"45k-65k", description:"Analyze company data.", status:"all"},
    {id:7, company:"InnoTech", position:"QA Engineer", location:"Sylhet", type:"Full-time", salary:"35k-50k", description:"Test web applications.", status:"all"},
    {id:8, company:"DevSphere", position:"Node.js Developer", location:"Remote", type:"Full-time", salary:"60k-90k", description:"Build scalable backend.", status:"all"}
];

let currentTab = "all";

function renderJobs() {

    const container = document.getElementById("jobContainer");
    const emptyState = document.getElementById("emptyState");
    container.innerHTML = "";

    let filteredJobs;

    if(currentTab === "all"){
        filteredJobs = jobs;
    } else {
        filteredJobs = jobs.filter(job => job.status === currentTab);
    }

    document.getElementById("tabCount").innerText = filteredJobs.length + " jobs";

    if(filteredJobs.length === 0){
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }

    filteredJobs.forEach(job => {

        const div = document.createElement("div");
        div.className = "border p-4 rounded shadow-sm";

        div.innerHTML = `
            <div class="flex justify-between">
                <div>
                    <h3 class="font-bold">${job.company}</h3>
                    <p class="text-sm text-gray-500">${job.position}</p>
                </div>
                <button onclick="deleteJob(${job.id})" class="text-red-500">Delete</button>
            </div>

            <p class="text-sm mt-2">${job.location} • ${job.type} • ${job.salary}</p>
            <p class="text-sm text-gray-600 mt-2">${job.description}</p>

            <div class="flex gap-2 mt-3">
                <button onclick="updateStatus(${job.id}, 'interview')" 
                    class="px-3 py-1 text-sm rounded ${job.status === 'interview' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'}">
                    Interview
                </button>

                <button onclick="updateStatus(${job.id}, 'rejected')" 
                    class="px-3 py-1 text-sm rounded ${job.status === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}">
                    Rejected
                </button>
            </div>
        `;

        container.appendChild(div);
    });

    updateDashboard();
}

function updateStatus(id, status){
    jobs = jobs.map(job => {
        if(job.id === id){
            return {...job, status: job.status === status ? "all" : status};
        }
        return job;
    });
    renderJobs();
}

function deleteJob(id){
    jobs = jobs.filter(job => job.id !== id);
    renderJobs();
}

function updateDashboard(){
    document.getElementById("totalCount").innerText = jobs.length;
    document.getElementById("interviewCount").innerText = jobs.filter(j=>j.status==="interview").length;
    document.getElementById("rejectedCount").innerText = jobs.filter(j=>j.status==="rejected").length;
}

function changeTab(tab){

    currentTab = tab;

    document.querySelectorAll(".tabBtn").forEach(btn=>{
        btn.classList.remove("bg-blue-500","text-white");
        btn.classList.add("bg-gray-200");
    });

    document.getElementById(tab+"Tab").classList.add("bg-blue-500","text-white");
    document.getElementById(tab+"Tab").classList.remove("bg-gray-200");

    renderJobs();
}

renderJobs();


