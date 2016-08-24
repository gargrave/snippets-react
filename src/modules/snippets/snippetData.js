export default {
  getNewRecord: function() {
    let dateNow = new Date();
    return {
      title: '',
      url: '',
      archived: false,
      starred: false,
      color: 'white',
      created: dateNow.getTime(),
      modified: dateNow.getTime()
    };
  },

  buildRecordData: function(record) {
    let dateNow = new Date();
    let dates = record.dates ? record.dates.sort((a, b) => b > a ? 1 : -1) : [];

    return {
      title: record.title ? record.title.trim() : '',
      url: record.url ? record.url.trim() : '',
      archived: record.archived || false,
      starred: record.starred || false,
      color: record.color || 'white',
      created: dateNow.getTime(),
      modified: dateNow.getTime()
    };
  }
};
