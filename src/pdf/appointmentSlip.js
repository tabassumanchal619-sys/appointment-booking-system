const PDFDocument = require("pdfkit");

const generateAppointmentSlip = (appointment, res) => {

    const doc = new PDFDocument({
        margin: 50
    });

    // Response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=appointment-${appointment.id}.pdf`
    );

    // Pipe PDF to browser/Postman
    doc.pipe(res);

    // =============================
    // Title
    // =============================
    doc
        .fontSize(22)
        .text("Appointment Confirmation", {
            align: "center"
        });

    doc.moveDown(2);

    // =============================
    // Appointment Details
    // =============================

    doc.fontSize(12);

    doc.text(`Appointment ID : ${appointment.id}`);
    doc.moveDown();

    doc.text(`Customer Name : ${appointment.User.name}`);
    doc.moveDown();

    doc.text(`Email : ${appointment.User.email}`);
    doc.moveDown();

    doc.text(`Service : ${appointment.Service.service_name}`);
    doc.moveDown();

    doc.text(`Date : ${appointment.date}`);
    doc.moveDown();

    doc.text(`Time : ${appointment.time}`);
    doc.moveDown();

    doc.text(`Duration : ${appointment.Service.duration} Minutes`);
    doc.moveDown();

    doc.text(`Price : ${appointment.Service.price} BDT`);
    doc.moveDown();

    doc.text(`Status : ${appointment.status}`);
    doc.moveDown(2);

    // Footer
    doc
        .fontSize(16)
        .text("Thank You!", {
            align: "center"
        });

    // Finish PDF
    doc.end();

};

module.exports = generateAppointmentSlip;