<template>
  <Loader class="contentLoader" v-if="loading"
    >Laen nimekirja<font-awesome-icon icon="spinner" size="2x" spin
  /></Loader>
  
  <div class="table-list">
    <h1 class="tableTitle">Nimekiri</h1>

    <table class="list">
      <thead>
        <tr>
          <th @click="columnSort('firstname')" class="categories">
            Eesnimi
            <font-awesome-icon :icon="getSortIconForField('firstname')" />
          </th>
          <th @click="columnSort('surname')" class="categories">
            Perekonnanimi<font-awesome-icon
              :icon="getSortIconForField('surname')"
            />
          </th>
          <th @click="columnSort('sex')" class="categories">
            Sugu<font-awesome-icon :icon="getSortIconForField('sex')" />
          </th>
          <th @click="columnSort('personal_code')" class="categories">
            Sünnikuupäev<font-awesome-icon
              :icon="getSortIconForField('personal_code')"
            />
          </th>
          <th class="categories" >Telefon</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(entry, i) in paginatedData" :key="`entry-${i}`">
          <tr
            class="data-row"
            :class="{ expanded: entry.expanded }"
            @click="() => toggleExpandedRow(entry, i)"
          >
            <td>{{ entry.firstname }}</td>
            <td>{{ entry.surname }}</td>
            <td>{{ getEntryGender(entry) }}</td>
            <td>{{ getEntryBirthDate(entry) }}</td>
            <td>{{ entry.phone }}</td>
          </tr>
          <tr v-if="entry.expanded" class="expanded-row">
            <td colspan="5">
              <div class="expanded-data">
                <div v-if="entry.image" class="data-image">
                  <img :src="entry.image.small" :alt="entry.image.title" />
                </div>
                <div class="data-content" v-html="entry.intro" />
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage">
        <font-awesome-icon icon="chevron-left" />
      </button>
      <button
        v-for="item in visiblePages"
        :class="{ active: item === page }"
        :key="item"
        @click="() => gotoPage(item)"
      >
        {{ item }}
      </button>
      <button @click="nextPage">
        <font-awesome-icon icon="chevron-right" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      perPage: 10,
      list: [],
      sort: {
        fieldName: "firstname",
        direction: "default",
      },
      localList: [],
      loading: [],
    };
  },
  watch: {
    page: function () {
      this.localList.forEach((e) => (e.expanded = false));
    },
  },
  computed: {
    paginatedData() {
      return this.localList.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
    totalPages() {
      return Math.floor(this.total / Number(this.perPage));
    },
    visiblePages() {
      if (this.totalPages <= 5) return this.totalPages;
      let pages = [];

      let start = this.page - 2;
      let end = this.page + 2;

      if (start < 1) {
        start = 1;
        end = 5;
      } else if (end > this.totalPages) {
        start = this.totalPages - 4;
        end = this.totalPages;
      }

      for (let i = start; i <= end; i += 1) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    toggleExpandedRow(entry, index) {
      this.localList.forEach((e, i) =>
        i !== index ? (e.expanded = false) : null
      );
      entry.expanded = !entry.expanded;
    },
    getEntryGender(entry) {
      return entry.sex === "m" ? "Mees" : "Naine";
    },
    getEntryBirthDate(entry) {
      const code = entry.personal_code.toString();

      let year;
      if (["1", "2"].includes(code.charAt(0))) year = "18";
      else if (["3", "4"].includes(code.charAt(0))) year = "19";
      else year = "20";

      year += code.substring(1, 3);
      const month = code.substring(3, 5);
      const day = code.substring(5, 7);

      return `${day}.${month}.${year}`;
    },
    getSortIconForField(field) {
      this.icons = {
        default: "sort",
        asc: "sort-down",
        desc: "sort-up",
      };
      if (this.sort.field === field) return this.icons[this.sort.direction];
      return this.icons.default;
    },
    nextPage() {
      if (this.page !== Math.ceil(this.list.length / this.perPage)) {
        this.page += 1;
      }
    },
    prevPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    },
    gotoPage(numPage) {
      this.page = numPage;
    },
    columnSort(fieldName) {
      const sortRotation = ["default", "asc", "desc"];

      let direction = sortRotation[sortRotation.indexOf("default") + 1];
      if (this.sort.field === fieldName)
        direction =
          sortRotation[sortRotation.indexOf(this.sort.direction) + 1] ||
          "default";

      console.log(fieldName, direction);
      this.sort = {
        field: fieldName,
        direction,
      };

      if (direction === "default") {
        this.localList = [...this.list];
        return;
      }
      this.localList = this.localList.sort((a, b) => {
        if (
          typeof a[fieldName] === "string" &&
          typeof b[fieldName] === "string"
        ) {
          if (direction === "asc") {
            return a[fieldName].localeCompare(b[fieldName], "et");
          } else {
            return b[fieldName].localeCompare(a[fieldName], "et");
          }
        } else {
          if (a[fieldName] < b[fieldName]) return 1;
          if (a[fieldName] > b[fieldName]) return -1;
        }
        return 0;
      });
    },
  },
  created() {
    fetch("https://midaiganes.irw.ee/api/list?offset=0&limit=500")
      .then((response) => response.json())
      .then((data) => {
        this.list = data.list;
        this.localList = [...data.list];
        this.loading = false;
      });
  },
};
</script>