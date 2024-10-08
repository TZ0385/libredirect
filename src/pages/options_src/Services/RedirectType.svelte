<script>
  const browser = window.browser || window.chrome

  import { onDestroy } from "svelte"
  import SvelteSelect from "svelte-select"
  import { options, config } from "../stores"
  import Row from "../../components/Row.svelte"
  import Label from "../../components/Label.svelte"
  import FrontendIcon from "./FrontendIcon.svelte"
  import Select from "../../components/Select.svelte"

  let _options
  let _config

  const unsubscribeOptions = options.subscribe(val => (_options = val))
  const unsubscribeConfig = config.subscribe(val => (_config = val))
  onDestroy(() => {
    unsubscribeOptions()
    unsubscribeConfig()
  })

  export let selectedService

  $: serviceConf = _config.services[selectedService]
  $: serviceOptions = _options[selectedService]
  $: frontendName = _options[selectedService].frontend

  let values
  $: if (serviceConf.frontends[frontendName].embeddable) {
    values = [
      { value: "both", name: browser.i18n.getMessage("both") || "Both" },
      { value: "sub_frame", name: browser.i18n.getMessage("onlyEmbedded") || "Only Embedded" },
      { value: "main_frame", name: browser.i18n.getMessage("onlyNotEmbedded") || "Only Not Embedded" },
    ]
  } else if (
    serviceConf.frontends[frontendName].desktopApp &&
    Object.values(serviceConf.frontends).some(frontend => frontend.embeddable)
  ) {
    values = [
      { value: "both", name: browser.i18n.getMessage("both") || "Both" },
      { value: "main_frame", name: browser.i18n.getMessage("onlyNotEmbedded") || "Only Not Embedded" },
    ]
    if (serviceOptions.redirectType == "sub_frame") {
      serviceOptions.redirectType = "main_frame"
      options.set(_options)
    }
  } else {
    values = [{ value: "main_frame", name: browser.i18n.getMessage("onlyNotEmbedded") || "Only Not Embedded" }]
    serviceOptions.redirectType = "main_frame"
    options.set(_options)
  }

  let embeddableFrontends = []
  $: if (serviceConf) {
    embeddableFrontends = []
    for (const [frontendId, frontendConf] of Object.entries(serviceConf.frontends)) {
      if (frontendConf.embeddable && frontendConf.instanceList) {
        embeddableFrontends.push({
          value: frontendId,
          label: frontendConf.name,
        })
      }
    }
  }
</script>

<Row>
  <Label>{browser.i18n.getMessage("redirectType") || "Redirect Type"}</Label>
  <Select
    value={serviceOptions.redirectType}
    onChange={e => {
      serviceOptions.redirectType = e.target.options[e.target.options.selectedIndex].value
      options.set(_options)
    }}
    {values}
  />
</Row>

{#if serviceConf.frontends[frontendName].desktopApp && serviceOptions.redirectType != "main_frame"}
  <Row>
    <Label>{browser.i18n.getMessage("embedFrontend") || "Embed Frontend"}</Label>
    <SvelteSelect
      clearable={false}
      class="svelte_select"
      value={serviceOptions.embedFrontend}
      on:change={e => {
        serviceOptions.embedFrontend = e.detail.value
        options.set(_options)
      }}
      items={embeddableFrontends}
    >
      <div class="slot" slot="item" let:item>
        <FrontendIcon details={item} {selectedService} />
        {item.label}
      </div>
      <div class="slot" slot="selection" let:selection>
        <FrontendIcon details={selection} {selectedService} />
        {selection.label}
      </div>
    </SvelteSelect>
  </Row>
{/if}
