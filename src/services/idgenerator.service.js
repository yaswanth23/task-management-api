const logger = require("../middleware/logger")("idgenerator-service");

module.exports.generateId = async () => {
  try {
    let epoch = process.env.EPOCH;
    let sequence = parseInt(process.env.SEQUENCE);
    let lastTimestamp = -1;
    let machineId = process.env.MACHINE_ID;

    let timestamp = new Date().getTime();

    if (timestamp < lastTimestamp) {
      throw new Error("Clock moved backwards");
    }

    if (timestamp === lastTimestamp) {
      sequence = (sequence + 1) & 0xfff; // Increment sequence and wrap if necessary

      if (sequence === 0) {
        // Sequence overflow, wait for next millisecond
        timestamp = waitNextMillis(lastTimestamp);
      }
    } else {
      sequence = 0;
    }

    lastTimestamp = timestamp;

    const idBigInt =
      ((BigInt(timestamp) - BigInt(epoch)) << 22n) |
      (BigInt(machineId) << 12n) |
      BigInt(sequence);

    return Number(idBigInt);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const waitNextMillis = (lastTimestamp) => {
  let timestamp = new Date().getTime();
  while (timestamp <= lastTimestamp) {
    timestamp = new Date().getTime();
  }
  return timestamp;
};
