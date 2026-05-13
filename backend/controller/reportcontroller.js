 const User = require("../models/usermodel");
const Request = require("../models/bloodrequestmodel");

// Get admin reports summary
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRequests = await Request.countDocuments();
    const approvedRequests = await Request.countDocuments({ status: "Approved" });
    const pendingRequests = await Request.countDocuments({ status: "Pending" });
    const rejectedRequests = await Request.countDocuments({ status: "Rejected" });

    res.status(200).json({
      totalUsers,
      totalRequests,
      approvedRequests,
      pendingRequests,
      rejectedRequests,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching report stats", error: err.message });
  }
};
