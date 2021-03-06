export const validColors = ['white', 'red', 'green', 'blue', 'yellow', 'orange', 'teal', 'gray'];

export default {
  getNewRecord: function() {
    let dateNow = new Date();
    return {
      title: '',
      url: '',
      archived: false,
      starred: false,
      pinned: false,
      color: 'white',
      created: dateNow.getTime(),
      modified: dateNow.getTime()
    };
  },

  buildRecordData: function(record) {
    let dateNow = new Date();
    return {
      title: record.title ? record.title.trim() : '',
      url: record.url ? record.url.trim() : '',
      archived: record.archived || false,
      starred: record.starred || false,
      pinned: record.pinned || false,
      color: record.color ? record.color.trim() : 'white',
      created: dateNow.getTime(),
      modified: dateNow.getTime()
    };
  },

  isValidColor: function(color) {
    let colorClean = (color || '').trim().toLocaleLowerCase();
    return validColors.find((c) => c === colorClean);
  }
};
