const Truck = require("../model/truckScheme");

const Truckdetails = require("../model/truckdetailsSchemea");

const getAllTruckdetails = async (req, res) => {
  try {
    const alltruck = await Truckdetails.find();
    console.log(alltruck);

    res.json(alltruck).status(200);
  } catch (error) {
    res.json({ message: error.message }).status(400);
  }
};

const calculateTKPH = async (truck) => {
  const { registrationNumber } = truck;
  const truckDetail = await Truckdetails.findOne({
    registrationNumber: registrationNumber,
  });

  const { capacity } = truckDetail;

  let payLoadcap = capacity.payload_capacity;
  let gross_weight = capacity.gross_vehicle_weight;

  payLoadcap = Number(payLoadcap.split(" ")[0]);

  gross_weight = Number(gross_weight.split(" ")[0]);

  const { payload, tyrePressure } = truck;
  // vehicle weight before loading
  const vehicle_weight = Math.round(
    Number(gross_weight) - Number(payLoadcap),
    2
  );
  // vechile weight after loading
  const LoadedTruckWeight = Math.round(vehicle_weight + Number(payload), 2);

  // Load in single Tyre before load
  const singleTyreLoad = vehicle_weight / 6;

  // Load in Single tyre after Load;

  const singleTyreLoadAfterLoad = Math.round(LoadedTruckWeight / 6, 2);

  // mead tyre load
  const meanTyreLoad = Math.round(
    (singleTyreLoad + singleTyreLoadAfterLoad) / 2,
    2
  );

  // logging  all

  // average speed of vehicle in km/hr for 1 working shift
  const roundTripDistance = 14; //km
  const noOfRoundTrip = 15; //cycles
  const workingShift = 8; // hours

  const Awss = (roundTripDistance * noOfRoundTrip) / workingShift;
  const tkph = meanTyreLoad * Awss;

  const data = {
    vehicle_weight,
    LoadedTruckWeight,
    payLoadcap,
    singleTyreLoad,
    singleTyreLoadAfterLoad,
    meanTyreLoad,
    Awss,
    tkph,
  };
  return data;
};

const GetTruckData = async (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  try {
    const truck = await Truck.findOne({
      registrationNumber: registrationNumber,
    });
    // calculate tkph
    const data = await calculateTKPH(truck);
    const response = {
      truck,
      data,
    };
    res.json(response).status(200);
  } catch (error) {
    console.log(error);

    res.json({ message: error.message }).status(400);
  }
};

module.exports = { GetTruckData, getAllTruckdetails };
