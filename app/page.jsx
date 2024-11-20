"use client";
import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import Select from 'react-select';
import {Slider, Textarea} from "@nextui-org/react";
import { motion, useInView } from "framer-motion";
import { useAnimationFrame } from "framer-motion";

export default function Page() {
  const [options, setOptions] = useState([]);
  const [nomineeEmail, setNomineeEmail] = useState([]);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch("/EMP_DT-edited.xlsx");
        const arrayBuffer = await response.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const newOptions = json.slice(3).map((row) => ({
          value: row[4],
          label: row[4],
        }));
        newOptions.sort((a, b) => a.label.localeCompare(b.label));

        const newNomineeEmail = json.slice(3).map((row) => ({
          value: row[18],
          label: row[18],
        }));

        setOptions(newOptions);
        setNomineeEmail(newNomineeEmail);
      } catch (error) {
        console.error("Error reading Excel file: ", error);
      }
    };
    fetchExcelData();
  }, []);

  const teams = [
    { value: 'AP-LADY', label: 'AP-LADY' },
    { value: 'AP-RICHMOND', label: 'AP-RICHMOND' },
    { value: 'BMS-LESTER', label: 'BMS-LESTER' },
    { value: 'DMS-AUSTIN', label: 'DMS-AUSTIN' },
    { value: 'DMS-BEA', label: 'DMS-BEA' },
    { value: 'DMS-JAMES', label: 'DMS-JAMES' },
    { value: 'DMS-SHEILA', label: 'DMS-SHEILA' },
    { value: 'FIN-BERT', label: 'FIN-BERT' },
    { value: 'FIN-DOM', label: 'FIN-DOM' },
    { value: 'FIN-JUNA', label: 'FIN-JUNA' },
    { value: 'FIN-JESS', label: 'FIN-JESS' },
    { value: 'FIN-KAMILLE', label: 'FIN-KAMILLE' },
    { value: 'FIN-MELAI', label: 'FIN-MELAI' },
    { value: 'FIN-ZHIEL', label: 'FIN-ZHIEL' },
    { value: 'QID-ROSELLE', label: 'QID-ROSELLE' },
    { value: 'SD-CHA', label: 'SD-CHA' },
    { value: 'SD-CO', label: 'SD-CO' },
    { value: 'SD-RAQS', label: 'SD-RAQS' },
    { value: 'WE + IT + ADMIN -SHERL', label: 'WE + IT + ADMIN -SHERL' },
  ];

  const month = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
  ]

  const teamlead = [
    { value: 'Abasolo, Sheila', label: 'Abasolo, Sheila'},
    { value: 'Agting, James', label: 'Agting, James'},
    { value: 'Briones, Lady', label: 'Briones, Lady'},
    { value: 'Calmona, Austin', label: 'Calmona, Austin'},
    { value: 'Calumag, Junalyn', label: 'Calumag, Junalyn'},
    { value: 'Chua, Isabel Beatriz', label: 'Chua, Isabel Beatriz'},
    { value: 'Corpuz, Christopher', label: 'Corpuz, Christopher'},
    { value: 'Cruz, Roselle', label: 'Cruz, Roselle'},
    { value: 'Ferareza, Kamille', label: 'Ferareza, Kamille'},
    { value: 'Ferrer, John Dominic', label: 'Ferrer, John Dominic'},
    { value: 'Flojo, Charlene', label: 'Flojo, Charlene'},
    { value: 'Galutera, Richmond', label: 'Galutera, Richmond'},
    { value: 'Kendall, Christopher', label: 'Kendall, Christopher'},
    { value: 'Lictawa, Melanie', label: 'Lictawa, Melanie'},
    { value: 'Lopez, Raquel', label: 'Lopez, Raquel'},
    { value: 'Mabborang, Mark Lester', label: 'Mabborang, Mark Lester'},
    { value: 'Motas, Rhiziel', label: 'Motas, Rhiziel'},
    { value: 'Orine, Christopher', label: 'Orine, Christopher'},
    { value: 'Padasas, Edilbert', label: 'Padasas, Edilbert'},
    { value: 'Renales, Jessirene', label: 'Renales, Jessirene'},
  ]

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#0a1fbe',
      borderRadius: '8px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#0a1fbe',
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: state.isSelected ? '#fba352' : provided.backgroundColor,
      color: state.isSelected ? '#0a1fbe' : provided.color,
      '&:hover': {
        backgroundColor: '#fba352',
      }
    }),
  };

  const [SelectedName, setSelectedName] = useState("");
  const [SelectedEmail, setSelectedEmail] = useState("");
  const [SelectedTeam, setSelectedTeam] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedFormSubmittedBy, setSelectedFormSubmittedBy] = useState("");
  const [quality, setQuality] = useState(1);
  const [qualityDesc, setQualityDesc] = useState("");
  const [clientFeedBack, setclientFeedBack] = useState(1);
  const [clientFeedBackDesc, setclientFeedBackDesc] = useState("");
  const [empower, setEmpower] = useState(1);
  const [empowerDesc, setEmpowerDesc] = useState("");
  const [tlA, setTlA] = useState(1);
  const [tlADesc, setTlADesc] = useState("");
  const [tlB, setTlB] = useState(1);
  const [tlBDesc, setTlBDesc] = useState("");
  //const [fileInput, setFileInput] = useState([]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const imgRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
  
    // Append manual fields to formData
    formData.append('SelectedName', SelectedName);
    formData.append('SelectedEmail', SelectedEmail);
    formData.append('SelectedTeam', SelectedTeam);
  
    // Append file(s) if selected
    //if (fileInput && fileInput.length > 0) {
     // Array.from(fileInput).forEach(file => {
     //   formData.append('fileInput', file);
     // });
   // }
  
    // Log formData entries for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbznDXJ_XWhD2xMtLw-Me-bA7Brs4nBVky3shml5u-yS4xsovcF9hGrvruGmCS7Yaaf-/exec", {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert(data.msg || "Form submitted successfully!");
    } catch (err) {
      console.error("Error during form submission:", err);
      alert("An error occurred while submitting the form.");
    }
  };
  


  useAnimationFrame((t) => {
    const y = (1 + Math.sin(t / 1000)) * -10;
    imgRef.current.style.transform = `translateY(${y}px)`;
  });


  return (
    <>
      <div className="flex items-center justify-center mt-5 transition" ref={ref} 
      style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}>
          <div className="w-3/5 h-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-3xl flex items-center justify-center mt-5">
          <img src="./Aretex.png" alt="Aretex" ref={imgRef} aria-label="Aretex Logo"/>
          </div>
      </div>
      <div className="flex items-center justify-center mt-5 mb-20"
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
      >
        <form  action="" ref={formRef} name="contact-form" onSubmit={(e)=>handleSubmit(e)} className="form w-3/5 bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-3xl font-medium">
          <div>
            <h1 aria-label="Rex ticket submission form" className="
              text-5xl
              flex
              items-center
              justify-center
              font-bold
            ">REX TICKET SUBMISSION FORM</h1>
          </div>
          <br /><br />
          <div className="">
            <label htmlFor="NOMINEE NAME" aria-label="nominee name" className="ml-3">NOMINEE NAME</label>
            <Select
            name="SelectedName"
              options={options}
              placeholder="Select Name"
              styles={customStyles}
              classNamePrefix="select"
              required
              value={SelectedName}
              onChange={setSelectedName}
              aria-label="nominee name select option"
            />
          </div>
          <div className="mt-10">
            <label htmlFor="NOMINEE EMAIL" aria-label="nominee email" className="ml-3">NOMINEE EMAIL</label>
            <Select
            name="SelectedEmail"
              options={nomineeEmail}
              placeholder="Select Email"
              styles={customStyles}
              classNamePrefix="select"
              required
              value={SelectedEmail}
              onChange={setSelectedEmail}
              aria-label="nominee email select option"
            />
          </div>
          <div className="mt-10">
            <label htmlFor="NOMINEE TEAM" aria-label="nominee team" className="ml-3">NOMINEE TEAM</label>
            <Select
              name="SelectedTeam"
              options={teams}
              placeholder="Select Team"
              styles={customStyles}
              classNamePrefix="select"
              required
              value={SelectedTeam}
              onChange={setSelectedTeam}
              aria-label="nominee team select option"
            />
          </div>
          <div className="mt-10">
            <label htmlFor="Month" aria-label="month" className="ml-3">MONTH</label>
              <Select
              name="SelectedMonth" 
                options={month}
                placeholder="Select Month"
                styles={customStyles}
                classNamePrefix="select"
                required
                value={selectedMonth}
                onChange={setSelectedMonth}
                aria-label="month select option"
              />
          </div>
              <div className="mt-10">
                <label htmlFor="" className="ml-3" aria-label="metric: quality">METRIC : QUALITY (1-5)</label>
              </div>
              <div className="flex items-center justify-center">
              <Slider
              name="Quality"   
                size="lg"
                step={1}
                showSteps={true}
                maxValue={5}
                color="foreground" 
                minValue={1}
                defaultValue={1}
                showTooltip={true}
                required
                aria-label="metric: quality slider"
                classNames={
                  {
                    base: "gap-3",
                    track: "border-s-pink-500",
                    filler: "bg-gradient-to-r from-pink-500 to-orange-500"
                  }
                }
                value={quality}
                onChange={setQuality}
              />
          </div>
          <div className="mt-10">
            <label htmlFor="TextArea" className="ml-3" aria-label="metric: quality description">METRIC : QUALITY DESCRIPTION</label>
                <Textarea
                name="QualityDesc"
                  key="bordered"
                  variant="faded"
                  className=""
                  placeholder="eg"
                  value={qualityDesc}
                  onChange={(e) => setQualityDesc(e.target.value)}
                  aria-label="metric: quality description text area"
                />
          </div>
              <div className="mt-10">
                <label htmlFor="" className="ml-3" aria-label="metric: client feedback">METRIC : CLIENT FEEDBACK (1-5)</label>
              </div>
            <div className="flex items-center justify-center">
            <Slider   
            name="ClientFeedBack"
              size="lg"
              step={1}
              showSteps={true}
              maxValue={5}
              color="foreground" 
              minValue={1}
              defaultValue={1}
              showTooltip={true}
              aria-label="metric: client feedback slider"
              classNames={
                {
                  base: "gap-3",
                  track: "border-s-pink-500",
                  filler: "bg-gradient-to-r from-pink-500 to-orange-500"
                }
              }
              value={clientFeedBack}
              onChange={setclientFeedBack}
            />
            </div>
            <div className="mt-10">
            <label htmlFor=""  className="ml-3" aria-label="metric: client feedback description">METRIC : CLIENT FEEDBACK DESCRIPTION</label>
                <Textarea
                  key="bordered"
                  name="ClientFeedBackDesc"              
                  variant="faded"
                  className=""
                  value={clientFeedBackDesc}
                  onChange={(e) => setclientFeedBackDesc(e.target.value)}
                  aria-label="metric: client feedback description text area"
                />
          </div>
          <div className="mt-10">
            <label htmlFor=""  className="ml-3" aria-label="metric: empower">METRIC : EMPOWER (1-3)</label>
          </div>
            <div className="flex items-center justify-center">
            <Slider   
            name="Empower"
              size="lg"
              step={1}
              showSteps={true}
              maxValue={3}
              color="foreground" 
              minValue={1}
              defaultValue={1}
              showTooltip={true}
              aria-label="metric: empower slider"
              classNames={
                {
                  base: "gap-3",
                  track: "border-s-pink-500",
                  filler: "bg-gradient-to-r from-pink-500 to-orange-500"
                }
              }
              value={empower}
              onChange={setEmpower}
            />
            </div>
            <div className="mt-10">
            <label htmlFor=""  className="ml-3" aria-label="metric: empower description">METRIC : EMPOWER DESCRIPTION</label>
                <Textarea
                  key="bordered"
                  name="EmpowerDesc"         
                  variant="faded"
                  className=""
                  value={empowerDesc}
                  onChange={(e) => setEmpowerDesc(e.target.value)}
                  aria-label="metric: empower description text area"
                />
          </div>
          <div className="mt-10">
            <label htmlFor=""  className="ml-3" aria-label="metric: TL Specific A">METRIC : TL SPECIFIC A (1-3)</label>
          </div>
            <div className="flex items-center justify-center">
            <Slider   
            name="TlA"
              size="lg"
              step={1}
              showSteps={true}
              maxValue={3}
              color="foreground" 
              minValue={1}
              defaultValue={1}
              showTooltip={true}
              aria-label="metric: tl specific a slider"
              classNames={
                {
                  base: "gap-3",
                  track: "border-s-pink-500",
                  filler: "bg-gradient-to-r from-pink-500 to-orange-500"
                }
              }
              value={tlA}
              onChange={setTlA}
            />
            </div>
            <div className="mt-10">
            <label htmlFor=""  className="ml-3" aria-label="metric: tl specific a description">METRIC : TL SPECIFIC A DESCRIPTION</label>
                <Textarea
                  key="bordered"
                  name="TlADesc"         
                  variant="faded"
                  className=""
                  value={tlADesc}
                  onChange={(e) => setTlADesc(e.target.value)}
                  aria-label="metric: tl specific a description text area"
                />
          </div>
          <div className="mt-10">
            <label htmlFor="" className="ml-3" aria-label="metric: tl specific b">METRIC : TL SPECIFIC B (1-3)</label>
          </div>
            <div className="flex items-center justify-center">
            <Slider   
            name="TlB"
              size="lg"
              step={1}
              showSteps={true}
              maxValue={3}
              color="foreground" 
              minValue={1}
              defaultValue={1}
              showTooltip={true}
              aria-label="metric: tl specific b slider"
              classNames={
                {
                  base: "gap-3",
                  track: "border-s-pink-500",
                  filler: "bg-gradient-to-r from-pink-500 to-orange-500"
                }
              }
              value={tlB}
              onChange={setTlB}
            />
            </div>
            <div className="mt-10">
            <label htmlFor="" className="ml-3" aria-label="metric: tl specific b description">METRIC : TL SPECIFIC B DESCRIPTION</label>
                <Textarea
                  key="bordered"
                  name="TlBDesc"             
                  variant="faded"
                  className=""
                  value={tlBDesc}
                  onChange={(e)=>setTlBDesc(e.target.value)}
                  aria-label="metric: tl specific b description text area"
                />
          </div>
          <div className="mt-10">
            <label htmlFor="" className="ml-3" aria-label="screenshots">SCREENSHOTS</label>
          </div>
          {/*<div className="flex items-center justify-center w-full">
            <input type="file"   accept="image/*"  multiple className="block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:text-neutral-500
                dark:file:bg-blue-500
                dark:hover:file:bg-blue-400
                bg-white p-5 rounded-2xl
              "
              id="fileInput" name="fileInput"
              aria-label="screenshot file input"
              onChange={(e) => setFileInput(e.target.files[0])}
              ></input>
         </div> */}
          <div className="mt-10">
            <label htmlFor="FORM SUBMITTED BY" className="ml-3" aria-label="form submitted by">FORM SUBMITTED BY</label>
              <Select
              name="SelectedFormSubmittedBy"
                options={teamlead}
                placeholder="Select"
                styles={customStyles}
                classNamePrefix="select"
                required
                value={selectedFormSubmittedBy}
                onChange={setSelectedFormSubmittedBy}
                aria-label="form submitted by select option"
              />
          </div>
          <div className="flex justify-center items-center mt-10">
          <motion.button
          aria-label="submit button"
            className="
            box h-20 rounded-3xl bg-gradient-to-tr w-2/3
             from-pink-500 to-yellow-500 text-white shadow-lg
              text-lg"
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
            transition={{ type: "spring", stiffness: 400, damping: 10}} type="submit">
              SUBMIT
            </motion.button>
          </div>
        </form>
      </div>
    </>
  );
}
