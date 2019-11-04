<template lang="pug">
extends ./ner-model.pug

block select-format-area
  div.field
    label.label Source model: (see
      |
      |
      a(
        href="//spacy.io/models/en"
        target="_blank"
      )
        | Spacy Model Page
      |
      | for details)
    div.control
    div.columns
      div.column.is-2
        label.radio
          input.tooltip(
            v-bind:checked="base_ner_model == 'en_core_web_sm'"
            v-model="base_ner_model"
            name="base_ner_model"
            type="radio"
            value="en_ner_concepts"
            checked=""
            required
            data-tooltip="Spacy Small Model (11MB)"
          )
          |  en_core_web_sm
      div.column
        label.radio
          input.tooltip(
            v-bind:checked="base_ner_model == 'en_core_web_md'"
            v-model="base_ner_model"
            name="base_ner_model"
            type="radio"
            value="en_ner_concepts"
            checked=""
            required
            data-tooltip="Spacy Medium Model (91MB)"
          )
          |  en_core_web_md
    div.columns
      div.column.is-2
        label.radio
          input.tooltip(
            v-bind:checked="base_ner_model == 'en_core_web_lg'"
            v-model="base_ner_model"
            name="base_ner_model"
            type="radio"
            value="en_ner_concepts"
            checked=""
            required
            data-tooltip="Spacy Large Model (789MB)"
          )
          |  en_core_web_lg

      div.column
        label.radio
          input.tooltip(
            v-bind:checked="base_ner_model == 'en_ner_concepts'"
            v-model="base_ner_model"
            name="base_ner_model"
            type="radio"
            value="en_ner_concepts"
            checked=""
            required
            data-tooltip="GLG model (based on en_core_web_lg)"
          )
          |  en_ner_concepts

    div.columns
      div.column.is-2
        label.radio
          input.tooltip(
            v-bind:checked="base_ner_model == 'blank'"
            v-model="base_ner_model"
            name="base_ner_model"
            type="radio"
            value="blank"
            checked=""
            required
            data-tooltip="Empty model (not recommended)"
          )
          |  Blank

      div.column
        label.radio
          input.tooltip(
            v-bind:checked="base_ner_model == 'specify'"
            v-model="base_ner_model"
            name="base_ner_model"
            type="radio"
            value="specify"
            checked=""
            required
            data-tooltip="Use model package from URL"
          )
          |  Specify URL
          input.input(
            v-model="model_url",
            type="text",
            placeholder="s3://bucketname/nermodel.tgz",
          )
  div.is-divider

  div.columns
    div.column.is-3
      div.field
        div.control
          input.input(
            v-model="modelName",
            type="text",
            required,
            placeholder="ner_concepts_consultations"
          )
    div.column.is-5
      label.label Saved Model Name

  div.columns
    div.column.is-3
      div.field
        div.control
          input.input(
            v-model="modelVersion",
            type="text",
            required,
            placeholder="2.1.0.glg-1",
          )
    div.column.is-5
      label.label Version Number for saved model (e.g. 2.1.0.glg-1)


  div.columns
    div.column.is-2
    div.column.is-1
      div.field
        div.control
          input.input(
            style="min-width: 55px",
            v-model="numIterations",
            type="number",
            required,
            placeholder="30",
            value="30"

          )
    div.column.is-5
      label.label Number of Iterations


  div.columns
    div.column.is-2
    div.column.is-1(style={"text-align":"right"})
      input(
        v-model="approvedOnly"
        name="approved_only"
        type="checkbox"
        style="margin-right: 0.25em;"
      )
    div.column.is-5
      label.label Only train on annotations marked "approved"

  div.columns
    div.column.is-2
    div.column.is-1(style={"text-align":"right"})
      input(
        v-model="loadIntoNew"
        name="load_new"
        type="checkbox"
        style="margin-right: 0.25em;"
      )
    div.column.is-5
      label.label Create New Project, annotated with new model


</template>

<script>
import Messages from './messages.vue';

export default {
  components: { Messages},
  data: () => ({
    items: [],
    base_ner_model: 'en_ner_concepts',
    username: '',
    modelName: '',
    modelVersion: '',
    approvedOnly: false,
    loadIntoNew: false,
    messages: [],
    model_url: '',
    numIterations: 30,
    isSuperuser: false,
    isProjectAdmin: null,
    isLoading: false,
  }),

  methods: {
    sleep (milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    },

    async train() {
      //Todo: https://stackoverflow.com/questions/57541356/how-to-send-the-output-of-a-long-running-python-script-over-a-websocket
      console.log("Running the train() method")
      this.isLoading = true;
      const payload = {
        name: this.modelName,
        version: this.modelVersion,
        approved_only: this.approvedOnly,
        load_into_new: this.loadIntoNew,
        num_iterations: this.numIterations
      };

      await this.sleep(3000)
      this.isLoading = false

    },
  },
};

</script>

