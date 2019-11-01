<template lang="pug">
extends ./ner-model.pug

block select-format-area
  div.columns
    div.column.is-1
      input(
        v-model="approvedOnly"
        name="approved_only"
        type="checkbox"
        style="margin-right: 0.25em;"
        required
      )
    div.column.is-5
      label.label Only train on annotations marked "approved"

  div.columns
    div.column.is-1
      div.field
        div.control
          input.input(
            v-model="nIterations",
            type="number",
            required,
            placeholder="30",
            value="30"
          )
    div.column.is-5
      label.label Number of Iterations

</template>

<script>
</script>
