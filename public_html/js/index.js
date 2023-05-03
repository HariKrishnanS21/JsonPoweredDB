/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var token= "90933221|-31949279982474173|90950720";
var dbname="Student";
var rel="STU-details";
var url="http://api.login2explore.com:5577";
var irl="/api/irl";
var iml="/api/iml";


$("#Id").focus();


            function validateAndGetFormData() {
                var IdVar = $("#Id").val();
                
                if (IdVar === "") {
                    alert("roll no Required Value");
                    $("#Id").focus();
                    return "";
                }
                var NameVar = $("#Name").val();
                if (NameVar === "") {
                    alert(" Name is Required Value");
                    $("#Name").focus();
                    return "";
                }
                var classVar = $("#class").val();
                if (classVar === "") {
                    alert("class is Required Value");
                    $("#class").focus();
                    return "";
                }
                var dobVar = $("#dob").val();
                if (dobVar === "") {
                    alert("dob is Required Value");
                    $("#dob").focus();
                    return "";
                }
                var addVar = $("#add").val();
                if (addVar === "") {
                    alert("address is Required Value");
                    $("#add").focus();
                    return "";
                }
                var endateVar = $("#endate").val();
                if (endateVar === "") {
                    alert("enrollment is Required Value");
                    $("#endate").focus();
                    return "";
                }
                var jsonStrObj = {
                    Roll_No: IdVar,
                    Name: NameVar,
                    Class: classVar,
                    DOB:dobVar,
                    Address:addVar,
                    Enrollment_date:endateVar
                };
                return JSON.stringify(jsonStrObj);
            }

            function reset() {
                $("#Id").val("");
                $("#Name").val("");
                $("#class").val("");
                $("#dob").val("");
                $("#add").val("");
                $("#endate").val("");
                $("#Id").prop("disabled",false);
                $("#save").prop("disabled",true);
                $("#change").prop("disabled",true);
                $("#reset").prop("disabled",true);
                $("#Id").focus();
            }
            
            function saverecno(jsonObj){
                var lvdata = JSON.parse(jsonObj.data);
                localStorage.setItem("recno",lvdata.rec_no);
            }
            
            function filldata(jsonObj){
                saverecno(jsonObj);
                var record = JSON.parse(jsonObj.data).record;
                $("#Name").val(record.Name);
                $("#class").val(record.Class);
                $("#dob").val(record.DOB);
                $("#add").val(record.Address);
                $("#endate").val(record.Enrollment_date);
            }
            
            function getempid(){
                var id = $("#Id").val();
                var jsonstr ={
                    Id:id
                };
                return JSON.stringify(jsonstr);
            }
            
            function getemp(){
                var empIdJsonObj = getempid();
                var getrequest = createGET_BY_KEYRequest(token,dbname,rel,empIdJsonObj);
                jQuery.ajaxSetup({async:false});
                var response = executeCommandAtGivenBaseUrl(getrequest,url,irl);
                jQuery.ajaxSetup({async:true});
                if(response.status === 400){
                    $("#save").prop("disabled",false);
                    $("#reset").prop("disabled",false);
                    $("#Name").focus();
                }else if(response.status === 200){
                    $("#Id").prop("disabled",true);
                    filldata(response);
                    $("#change").prop("disabled",false);
                    $("#reset").prop("disabled",false);
                    $("#Name").focus();
                }
            }
            
            function changeData(){
                $("#change").prop("disabled",true);
                jsonchg = validateAndGetFormData();
                var updaterequest = createUPDATERecordRequest(token,jsonchg,dbname,rel, localStorage.getItem("recno"));
                jQuery.ajaxSetup({async: false});
                var resjson = executeCommandAtGivenBaseUrl(updaterequest,
                        url, iml);
                alert("successfully updated");
                jQuery.ajaxSetup({async: true});
                console.log(resjson);
                reset();
                $("#Id").focus();
            }

            function saveEmployee() {
                var jsonStr = validateAndGetFormData();
                if (jsonStr === "") {
                    return;
                }
                var putReqStr = createPUTRequest(token,
                        jsonStr, dbname, rel);
                
                jQuery.ajaxSetup({async: false});
                var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
                        url, iml);
                alert("successfully saved");
                jQuery.ajaxSetup({async: true});
                reset();
            }
