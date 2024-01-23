const commonNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Isabella', 'Sophia', 'Jackson', 'Lucas', 'Aiden'];
const commonSurnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'García', 'Rodriguez', 'Martinez'];
const strongPasswords = [
    'P@ssw0rd!',
    'Secure#123',
    'G3n3ric$Pass',
    'Str0ngP@$$',
    'Pa$$w0rd!123',
    'S3cur3P@55',
    'Ch@ngeMeNow',
    'P@ssw0rd123!',
    'C0mpl3xP@ss',
    '2F@ctorAuth!'
  ];

const randomThreeDigitNumbers = [ 101 ];

let times = generateTimeList();

function generateTimeList() {
    const timeList = [];
    const startTime = 8 * 60; // 8:00 converted to minutes
    const endTime = 17 * 60; // 17:00 converted to minutes
    const interval = 15; // 15-minute interval

    for (let minutes = startTime; minutes <= endTime; minutes += interval) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        // Format the time as HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        
        timeList.push(formattedTime);
    }

    return timeList;
}

// @ts-ignore
function getRandomElement(list = []) {

    if (list.length === 0) {
      return undefined;
    }

    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function generateUniqueThreeDigitNumber() {
    let newNumber;

    do {
        
        newNumber = Math.floor(Math.random() * 900) + 100;
    } while (randomThreeDigitNumbers.includes(newNumber));


    randomThreeDigitNumbers.push(newNumber);

    return newNumber;
}

export function generateInput(){

    let format = {
        name: getRandomElement(commonNames),
        surname: getRandomElement(commonSurnames),
        password: getRandomElement(strongPasswords),
        role: 'Operator',
        workerID: String(generateUniqueThreeDigitNumber()),
        lunchTime: getRandomElement(times)
    }
    return format
}

export function generateRoom(){

    let format = {
        name: 'Room_'+String(generateUniqueThreeDigitNumber()),
        type: 'Cold Storage Room',
        size: ['3','3','3']
    };

    return format

}

export function generateMachine(){

    let format = {
        name: 'Machine_'+String(generateUniqueThreeDigitNumber()),
        type: 'FTA Machine'
    }

    return format
}


