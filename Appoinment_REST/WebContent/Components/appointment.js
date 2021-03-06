//Page refresh moment
$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// Save ============================================
$(document).on("click", "#btnSave", function(event) {

	// Clear alerts-------------------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation----------------------------
	var status = validateForm();
	if (status != true) {

		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid
	var type = ($("#hidAppointmentIdSave").val() == "") ? "POST" : "PUT";

	$.ajax({

		url : "AppointmentAPI",
		type : type,
		data : $("#appointmentCreation").serialize(),
		dataType : "text",
		complete : function(response, status) {

			onAppointmentComplete(response.responseText, status);
		}
	});

});

function onAppointmentComplete(response, status) {

	if (status == "success") {

		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {

			$("#alertSuccess").text("Successfully Created...!");
			$("#alertSuccess").show();

			$("#divAppointmentsGrid").html(resultSet.data);

		} else if (resultSet.status.trim() == "error") {

			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while saving...!");
		$("#alertError").show();

	} else {
		$("#alertError").text("Unknown error while saving...!");
		$("#alertError").show();
	}

	$("#hidAppointmentIdSave").val("");
	$("#appointmentCreation")[0].reset();

}

// Update ======================================
$(document).on("click",".btnUpdate", function(event) {
					$("#hidAppointmentIdSave").val($(this).closest("tr").find('#hidAppointmentIdUpdate').val());
					$("#patientId").val($(this).closest("tr").find('td:eq(1)').text());
					$("#patientName").val($(this).closest("tr").find('td:eq(2)').text());
					$("#phone").val($(this).closest("tr").find('td:eq(3)').text());
					$("#doctorName").val($(this).closest("tr").find('td:eq(4)').text());
					$("#specialization").val($(this).closest("tr").find('td:eq(5)').text());
					$("#hospitalId").val($(this).closest("tr").find('td:eq(6)').text());
					$("#hospitalName").val($(this).closest("tr").find('td:eq(7)').text());
					$("#appointmentDate").val($(this).closest("tr").find('td:eq(8)').text());
					$("#appointmentTime").val($(this).closest("tr").find('td:eq(9)').text());

				});

// Delete ======================================================
$(document).on("click", ".btnRemove", function(event) {

	$.ajax({
		url : "AppointmentAPI",
		type : "DELETE",
		data : "appointmentId=" + $(this).data("appointmentid"),
		dataType : "text",
		complete : function(response, status) {

			onAppointmentDeleteComplete(response.responseText, status);
		}
	});
});

function onAppointmentDeleteComplete(response, status) {

	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {

			$("#alertSuccess").text("Successfully Deleted...!");
			$("#alertSuccess").show();

			$("#divAppointmentsGrid").html(resultSet.data);

		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while deleting...!");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting...!");
		$("#alertError").show();
	}
}


// Client-Model ==========================================
function validateForm() {

	if ($("#patientId").val().trim() == "") {
		return "Insert Patient Id...!";
	}
	
	var patid =  /^([A-Za-z0-9]).{5}$/;
	var tmpPatid =  $("#patientId").val().trim();
	if(!tmpPatid.match(patid)){
		return "Insert a Patient ID upto 6 characters...!";
	}
	
	
	if ($("#patientName").val().trim() == "") {
		return "Insert Patient Name...!";
	}
	
	var letterReg1 = /^[A-Za-z\s]+$/;
	var tmpfName1 =  $("#patientName").val().trim();
	if(!tmpfName1.match(letterReg1)){
		return "Patient Name must have alphabetic charaters only...!";
	}
	
	
	if ($("#phone").val().trim() == "") {
		return "Insert Mobile Number...!";
	}
	
	var contactReg = /^\d{10}$/;
	var tmpPhone =  $("#phone").val().trim();
	if(!tmpPhone.match(contactReg)){
		return "Insert a valid Phone Number...!";
	}
	
	
	if ($("#doctorName").val().trim() == "") {
		return "Insert Doctor Name...!";
	}
	
	var letterReg2 = /^[A-Za-z\s]+$/;
	var tmpfName2 =  $("#doctorName").val().trim();
	if(!tmpfName2.match(letterReg2)){
		return "Doctor Name must have alphabetic charaters only...!";
	}
	
	
	if ($("#specialization").val().trim() == "") {
		return "Insert Specialization...!";
	}
	
	var letterReg3 = /^[A-Za-z\s]+$/;
	var tmpfName3 =  $("#specialization").val().trim();
	if(!tmpfName3.match(letterReg3)){
		return "Specialization must have alphabetic charaters only...!";
	}
	
	
	if ($("#hospitalId").val().trim() == "") {
		return "Insert Hospital Id...!";
	}
	
	var hosid =  /^([A-Za-z0-9]).{5}$/;
	var tmpHosid =  $("#hospitalId").val().trim();
	if(!tmpHosid.match(hosid)){
		return "Insert a Hospital ID upto 6 characters...!";
	}
	
	
	if ($("#hospitalName").val().trim() == "") {
		return "Insert Hospital Name...!";
	}
	
	var letterReg4 = /^[A-Za-z\s]+$/;
	var tmpfName4 =  $("#hospitalName").val().trim();
	if(!tmpfName4.match(letterReg4)){
		return "Hospital Name must have alphabetic charaters only...!";
	}
	
	
	if ($("#appointmentDate").val().trim() == "") {
		return "Insert Appointment Date...!";
	}
	if ($("#appointmentTime").val().trim() == "") {
		return "Insert Appointment Time...!";
	}

	return true;
}