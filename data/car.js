class Car {

  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  get brand() { return this.#brand; }

  get model() { return this.#model; }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
  }

  go() {

    if (this.isTrunkOpen) {
      console.log("Can't move, trunk is open!");
      return;
    }

    this.speed += 5;
    if (this.speed > 200) this.speed = 200;
    this.displayInfo();
  }

  brake() {

    this.speed -= 5;
    if (this.speed < 0) this.speed = 0;
    this.displayInfo();
  }

  openTrunk() {

    if (this.speed === 0) {
      this.isTrunkOpen = true;
      console.log('Trunk opened');
    } else {
      console.log("Can't open trunk, car is moving");
    }
  }

  closeTrunk() {
    if (this.speed === 0 && this.isTrunkOpen) {
      this.isTrunkOpen = false;
      console.log('Trunk closed');
    } else if (this.speed > 0) {
      console.log("Can't close trunk, car is moving");
    } else {
      console.log("Trunk is already closed");
    }
  }

}

class RaceCar extends Car {

  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Acceleration: ${this.acceleration}`);
  }

  go() {
    this.acceleration += 5;
    this.speed += this.acceleration;
    if (this.speed > 300) this.speed = 300;
    this.displayInfo();
  }

  brake() {
    this.acceleration -= 5;
    if (this.acceleration < 0) this.acceleration = 0;
    this.speed -= this.acceleration;
    if (this.speed < 0) this.speed = 0;
    if (this.speed === 0) this.acceleration = 0;  // ✅ reset acceleration when stopped
    this.displayInfo();
  }

  openTrunk() {
    console.log("Race cars don't have a trunk!");
  }

  closeTrunk() {
    console.log("Race cars don't have a trunk!");
  }

}


const [Toyota, Tesla] = [
  { brand: 'Toyota', model: 'Corolla' },
  { brand: 'Tesla',  model: 'Model 3' }
].map(detail => new Car(detail));

const McLaren = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 20 });

Toyota.go();
Toyota.openTrunk()
Toyota.closeTrunk();

Toyota.brake();
Toyota.closeTrunk();

McLaren.brake();

McLaren.go();
McLaren.go();