const Service = require("../models/Service");

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getAllServices = async (req, res) => {
  try {
    console.log("Fetching all services...");

    const services = await Service.find({ isActive: true })
      .populate("providerId", "name email") // غيّر من provider إلى providerId
      .sort({ createdAt: -1 });

    console.log(`Found ${services.length} services`);

    res.json(services);
  } catch (error) {
    console.error("Get all services error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "providerId", // غيّر من provider إلى providerId
      "name email"
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("Get service error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Provider only)
exports.createService = async (req, res) => {
  try {
    const { name, title, description, duration, price, category, image } =
      req.body;

    if (req.user.role !== "provider") {
      return res
        .status(403)
        .json({ message: "Only providers can create services" });
    }

    const service = await Service.create({
      name: name || title, // استخدم name أو title
      title,
      description,
      duration,
      price,
      category,
      image,
      providerId: req.user._id, // غيّر من provider إلى providerId
    });

    const populatedService = await Service.findById(service._id).populate(
      "providerId", // غيّر من provider إلى providerId
      "name email"
    );

    res.status(201).json(populatedService);
  } catch (error) {
    console.error("Create service error:", error);
    res.status(400).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

// @desc    Get provider's services
// @route   GET /api/services/provider/:id
// @access  Private
exports.getProviderServices = async (req, res) => {
  try {
    const services = await Service.find({
      providerId: req.params.id, // غيّر من provider إلى providerId
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    console.error("Get provider services error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Provider only)
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // غيّر من provider إلى providerId
    if (service.providerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this service" });
    }

    const { name, title, description, duration, price, category, image } =
      req.body;

    service.name = name || service.name;
    service.title = title || service.title;
    service.description = description || service.description;
    service.duration = duration || service.duration;
    service.price = price || service.price;
    service.category = category || service.category;
    service.image = image || service.image;

    await service.save();

    const updatedService = await Service.findById(service._id).populate(
      "providerId", // غيّر من provider إلى providerId
      "name email"
    );

    res.json(updatedService);
  } catch (error) {
    console.error("Update service error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Provider only)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // غيّر من provider إلى providerId
    if (service.providerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this service" });
    }

    await service.deleteOne();

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete service error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
