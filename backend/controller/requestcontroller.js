const Request = require("../models/bloodrequestmodel");

// Create new blood request
exports.createRequest = async (req, res) => {
  try {
    const { userId, fullName, bloodGroup, hospital, status } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newRequest = new Request({
      userId,
      fullName,
      bloodGroup,
      hospital,
      status: status || "Pending",
    });

    await newRequest.save();

    res.status(201).json({
      message: "Blood request submitted successfully!",
      request: newRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating request", error: err.message });
  }
};


// Get all blood requests (Admin)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};

// Get requests by user
exports.getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.params.userId });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user requests" });
  }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedRequest)
      return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Status updated successfully", request: updatedRequest });
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err.message });
  }
};

// Delete request
exports.deleteRequest = async (req, res) => {
  try {
    const deleted = await Request.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request", error: err.message });
  }
};