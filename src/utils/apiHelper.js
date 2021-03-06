class ApiHelper {
  static findRecordById(records, id) {
    let record = records.filter(record => record.id == id);
    if (record) {
      return Object.assign({}, record[0]);
    }
    return null;
  }
}

export default ApiHelper;
