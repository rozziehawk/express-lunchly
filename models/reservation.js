/** Reservation for Lunchly */

const moment = require("moment");
const ExpressError = require("../expressError");

const db = require("../db");



/** A reservation for a party */

class Reservation {
  constructor({id, customerId, numGuests, startAt, notes}) {
    this.id = id;
    this.customerId = customerId;
    this.numGuests = numGuests;
    this.startAt = startAt;
    this.notes = notes;
  }

  /** formatter for startAt */

  getformattedStartAt() {
    return moment(this.startAt).format('MMMM Do YYYY, h:mm a');
  }

  /** given a customer id, find their reservations. */

  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
          `SELECT id, 
           customer_id AS "customerId", 
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes AS "notes"
         FROM reservations 
         WHERE customer_id = $1`,
        [customerId]
    );

    return results.rows.map(row => new Reservation(row));
  }


  async save() {
    //console.log(this.startAt);

   
    if (this.id)
    {
      const results = await db.query(
        `UPDATE reservations
        SET customer_id = $1, start_at = '$2', num_guests=$3, notes='$4'
        WHERE id =  $5 RETURNING id, customer_id, start_at, num_guests, notes`,
        [this.customerId, this.startAt,this.numGuests, this.notes, this.id]); 
        return results.rows.map(row => new Reservation(row));
    }
    else
    {
      
      const results = await db.query(`INSERT INTO reservations
      (customer_id, start_at, num_guests, notes) VALUES 
      ($1, $2, $3, $4) RETURNING id, customer_id, start_at, num_guests, notes`,
      [this.customerId, this.startAt,this.numGuests, this.notes]);
      return results.rows.map(row => new Reservation(row));

    }
  }


}

module.exports = Reservation;
