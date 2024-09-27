import Cars from "../models/carModel.js";

const carFormController = async (req, res) => {
  // Extract nested properties from req.body.userId
  const { userId } = req.body.userId; // Extract the actual userId string
  const { formData, pictures } = req.body.userId; // Extract formData and pictures from the nested object

  console.log('UserId:', userId);
  console.log('FormData:', formData);
  console.log('Pictures:', pictures);

  try {
    let carForm = await Cars.findOne({ userId });

    if (!carForm) {
      // Create a new car form if none exists
      carForm = new Cars({
        userId,  // The actual string userId
        carModel: formData.carModel,
        price: formData.price,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
        maxPictures: formData.maxPictures,
        pictures: pictures // Pass the pictures array
      });

      const savedCarForm = await carForm.save();
      return res.status(201).json(savedCarForm);
    } else {
      // Update the existing car form
      carForm.carModel = formData.carModel;
      carForm.price = formData.price;
      carForm.phoneNumber = formData.phoneNumber;
      carForm.city = formData.city;
      carForm.maxPictures = formData.maxPictures;
      carForm.pictures = pictures;

      // Save the updated car form
      const updatedCarForm = await carForm.save();
      return res.status(200).json(updatedCarForm);
    }
  } catch (error) {
    console.error('Error saving car form:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to save car form', details: error.message });
  }
};

export default carFormController;
