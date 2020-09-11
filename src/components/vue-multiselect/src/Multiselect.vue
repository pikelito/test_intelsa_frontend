<template>
  <div
    :tabindex="searchable ? -1 : tabindex"
    :class="{ 'multiselect--active': isOpen, 'multiselect--disabled': disabled, 'multiselect--above': isAbove, 'multiselect--info': isInfo, 'multiselect--data': isData }"
    @focus="activate()"
    @blur="searchable ? false : deactivate()"
    @keydown.self.down.prevent="pointerForward()"
    @keydown.self.up.prevent="pointerBackward()"
    @keypress.enter.tab.stop.self="addPointerElement($event)"
    @keyup.esc="deactivate()"
    class="multiselect">
      <slot name="caret" :toggle="toggle">
        <div @mousedown.prevent.stop="toggle()" class="multiselect__select"></div>
      </slot>
      <slot name="clear" :search="search"></slot>
      <div ref="tags" class="multiselect__tags">
        <slot
          name="selection"
          :search="search"
          :remove="removeElement"
          :values="visibleValues"
          :is-open="isOpen"
        >
          <div class="multiselect__tags-wrap" v-show="visibleValues.length > 0">
            <template v-for="(option, index) of visibleValues" @mousedown.prevent>
              <slot name="tag" :option="option" :search="search" :remove="removeElement">
                <span class="multiselect__tag" :key="index">
                  <span v-text="getOptionLabel(option)"></span>
                  <i aria-hidden="true" tabindex="1" @keypress.enter.prevent="removeElement(option)"  @mousedown.prevent="removeElement(option)" class="multiselect__tag-icon"></i>
                </span>
              </slot>
              <slot name="actualizar">
                actualizar
              </slot>
            </template>
          </div>
          <template v-if="internalValue && internalValue.length > limit">
            <slot name="limit">
              <strong class="multiselect__strong" v-text="limitText(internalValue.length - limit)"/>
            </slot>
          </template>
        </slot>
        <transition name="multiselect__loading">
          <slot name="loading">
            <div v-show="loading" class="multiselect__spinner"/>
          </slot>
        </transition>
        <input
          ref="search"
          v-if="searchable"
          :name="name"
          :id="id"
          type="text"
          autocomplete="nope"
          :placeholder="placeholder"
          :style="inputStyle"
          :value="search"
          :disabled="disabled"
          :tabindex="tabindex"
          @input="updateSearch($event.target.value)"
          @focus.prevent="activate()"
          @blur.prevent="deactivate()"
          @keyup.esc="deactivate()"
          @keydown.down.prevent="pointerForward()"
          @keydown.up.prevent="pointerBackward()"
          @keypress.enter.prevent.stop.self="addPointerElement($event)"
          @keydown.delete.stop="removeLastElement()"
          class="multiselect__input"
        />
        <span
          v-if="isSingleLabelVisible"
          class="multiselect__single"
          @mousedown.prevent="toggle"
        >
          <slot name="singleLabel" :option="singleValue">
            <template>{{ currentOptionLabel }}</template>
          </slot>
        </span>
        <span
          v-if="isPlaceholderVisible"
          class="multiselect__placeholder"
          @mousedown.prevent="toggle"
        >
          <slot name="placeholder">
            {{ placeholder }}
          </slot>
        </span>
      </div>
      <transition name="multiselect">
        <div
          class="multiselect__content-wrapper"
          v-show="isOpen"
          @focus="activate"
          tabindex="-1"
          @mousedown.prevent
          :style="{ maxHeight: optimizedHeight + 'px' }"
          ref="list"
        >
          <ul class="multiselect__content" :style="contentStyle">
            <slot name="beforeList"></slot>
            <li v-if="multiple && max === internalValue.length">
              <span class="multiselect__option">
                <slot name="maxElements">Máximo de {{ max }} opciones seleccionadas. Primero remueva una opción para seleccionar otra.</slot>
              </span>
            </li>
            <template v-if="!max || internalValue.length < max">
              <li class="multiselect__element" v-for="(option, index) of filteredOptions" :key="index">
                <span
                  v-if="!(option && (option.$isLabel || option.$isDisabled))"
                  :class="optionHighlight(index, option)"
                  @click.stop="select(option)"
                  @mouseenter.self="pointerSet(index)"
                  :data-select="option && option.isTag ? tagPlaceholder : selectLabelText"
                  :data-selected="selectedLabelText"
                  :data-deselect="deselectLabelText"
                  class="multiselect__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
                <span
                  v-if="option && (option.$isLabel || option.$isDisabled)"
                  :data-select="groupSelect && selectGroupLabelText"
                  :data-deselect="groupSelect && deselectGroupLabelText"
                  :class="groupHighlight(index, option)"
                  @mouseenter.self="groupSelect && pointerSet(index)"
                  @mousedown.prevent="selectGroup(option)"
                  class="multiselect__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
              </li>
            </template>
            <li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
              <span class="multiselect__option">
                <slot name="noResult" :search="search">Sin resultados.</slot>
              </span>
            </li>
            <li v-show="showNoOptions && (options.length === 0 && !search && !loading)">
              <span class="multiselect__option">
                <slot name="noOptions">Lista vacia.</slot>
              </span>
            </li>
            <slot name="afterList"></slot>
          </ul>
        </div>
      </transition>
  </div>
</template>

<script>
import multiselectMixin from './multiselectMixin'
import pointerMixin from './pointerMixin'

export default {
  name: 'vue-multiselect',
  mixins: [multiselectMixin, pointerMixin],
  props: {
    /**
     * name attribute to match optional label element
     * @default ''
     * @type {String}
     */
    name: {
      type: String,
      default: ''
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectLabel: {
      type: String,
      default: 'Press enter to select'
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectGroupLabel: {
      type: String,
      default: 'Press enter to select group'
    },
    /**
     * String to show next to selected option
     * @default 'Selected'
     * @type {String}
     */
    selectedLabel: {
      type: String,
      default: 'Selected'
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectLabel: {
      type: String,
      default: 'Press enter to remove'
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectGroupLabel: {
      type: String,
      default: 'Press enter to deselect group'
    },
    /**
     * Decide whether to show pointer labels
     * @default true
     * @type {Boolean}
     */
    showLabels: {
      type: Boolean,
      default: true
    },
    /**
     * Limit the display of selected options. The rest will be hidden within the limitText string.
     * @default 99999
     * @type {Integer}
     */
    limit: {
      type: Number,
      default: 99999
    },
    /**
     * Sets maxHeight style value of the dropdown
     * @default 300
     * @type {Integer}
     */
    maxHeight: {
      type: Number,
      default: 300
    },
    /**
     * Function that process the message shown when selected
     * elements pass the defined limit.
     * @default 'and * more'
     * @param {Int} count Number of elements more than limit
     * @type {Function}
     */
    limitText: {
      type: Function,
      default: count => `and ${count} more`
    },
    /**
     * Set true to trigger the loading spinner.
     * @default False
     * @type {Boolean}
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Disables the multiselect if true.
     * @default false
     * @type {Boolean}
     */
    isData: {
      type: Boolean,
      default: false
    },
    isInfo: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Fixed opening direction
     * @default ''
     * @type {String}
     */
    openDirection: {
      type: String,
      default: ''
    },
    /**
     * Shows slot with message about empty options
     * @default true
     * @type {Boolean}
     */
    showNoOptions: {
      type: Boolean,
      default: true
    },
    showNoResults: {
      type: Boolean,
      default: true
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isSingleLabelVisible () {
      return (
        (this.singleValue || this.singleValue === 0 || !this.singleValue) &&
        (!this.isOpen || !this.searchable) &&
        !this.visibleValues.length
      )
    },
    isPlaceholderVisible () {
      return !this.internalValue.length && (!this.searchable || !this.isOpen)
    },
    visibleValues () {
      return this.multiple ? this.internalValue.slice(0, this.limit) : []
    },
    singleValue () {
      return this.internalValue[0]
    },
    deselectLabelText () {
      return this.showLabels ? this.deselectLabel : ''
    },
    deselectGroupLabelText () {
      return this.showLabels ? this.deselectGroupLabel : ''
    },
    selectLabelText () {
      return this.showLabels ? this.selectLabel : ''
    },
    selectGroupLabelText () {
      return this.showLabels ? this.selectGroupLabel : ''
    },
    selectedLabelText () {
      return this.showLabels ? this.selectedLabel : ''
    },
    inputStyle () {
      if (
        this.searchable ||
        (this.multiple && this.value && this.value.length)
      ) {
        // Hide input by setting the width to 0 allowing it to receive focus
        return this.isOpen
          ? { width: '100%' }
          : { width: '0', position: 'absolute', padding: '0' }
      }
    },
    contentStyle () {
      return this.options.length
        ? { display: 'inline-block' }
        : { display: 'block' }
    },
    isAbove () {
      if (this.openDirection === 'above' || this.openDirection === 'top') {
        return true
      } else if (
        this.openDirection === 'below' ||
        this.openDirection === 'bottom'
      ) {
        return false
      } else {
        return this.preferredOpenDirection === 'above'
      }
    },
    showSearchInput () {
      return (
        this.searchable &&
        (this.hasSingleSelectedSlot &&
        (this.visibleSingleValue || this.visibleSingleValue === 0)
          ? this.isOpen
          : true)
      )
    }
  }
}
</script>

<style>
fieldset[disabled] .multiselect {
  pointer-events: none;
}

.multiselect {
  position: relative;
  display: block;
  width: 100%;
  min-height: 31px;
  color: #333333;
  text-align: left; }
  .multiselect, .multiselect__input, .multiselect__single {
    font-family: inherit;
    font-size: 14px;
    -ms-touch-action: manipulation;
        touch-action: manipulation; }
  .multiselect--disabled {
    pointer-events: none; }
  .multiselect--active {
    z-index: 50;
    }
    .multiselect--active .multiselect__tags {
      border-color: #80bdff;
      -webkit-box-shadow: 0 0 0 1px rgba(0, 123, 255, 0.25);
              box-shadow: 0 0 0 1px rgba(0, 123, 255, 0.25); }
    .multiselect--active .multiselect__select {
      -webkit-transform: rotate(180deg);
              transform: rotate(180deg); }

.multiselect__tags {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  width: 100%;
  padding: 2px;
  font-size: 14px;
  line-height: 1.42857143;
  min-height: 31px;
  color: #333333;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  padding-right: 24px;
  background-color: #fff;
  background-image: -webkit-gradient(linear, left top, left bottom, from(0), color-stop(0%, rgba(0, 0, 0, 0.03)), to(rgba(0, 0, 0, 0)));
  background-image: linear-gradient(0, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0) 100%); }

.multiselect__select {
  position: absolute;
  display: block;
  right: 5px;
  top: 50%;
  margin-top: -3px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #888 transparent transparent transparent; }

.multiselect__single,
.multiselect__input {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 24px;
  line-height: 24px;
  padding: 0 5px;
  }

.multiselect__input {
  border: 0;
  background: none;
  -webkit-box-shadow: none;
          box-shadow: none;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none; }

.multiselect__placeholder {
  color: #888888; }
  .multiselect--active .multiselect__placeholder {
    display: none; }

.multiselect__tags-wrap {
  display: inline;
  max-width: 100%; }

.multiselect__tag {
  margin: 2px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-size: 12px;
  line-height: 16px;
  height: 24px;
  border-radius: 2px;
  color: #fff;
  border: 1px solid rgba(0, 123, 255, 0.25);
  background-color: #7872ff;
  max-width: 100%;
  overflow: hidden; }
  .multiselect__tag span {
    display: block;
    padding: 3px 6px;
    line-height: 16px;
    height: 22px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; }
  .multiselect__tag-icon {
    display: block;
    color: rgba(255, 255, 255, 0.75);
    border-left: 1px solid #6c67e6;
    padding: 3px 8px;
    line-height: 16px;
    height: 22px;
    font-family: Helvetica, Arial, sans-serif;
    font-style: normal;
    cursor: pointer; }
    .multiselect__tag-icon:after {
      content: '\D7'; }
    .multiselect__tag-icon:hover {
      color: #fff; }
  .multiselect__tag ~ .multiselect__input,
  .multiselect__tag ~ .multiselect__single {
    width: auto; }

.multiselect__content-wrapper {
  position: absolute;
  display: block;
  width: 100%;
  top: 100%;
  max-height: 240px;
  margin-top: 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.08);
          box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.08);
  border: 1px solid #ddd;
  border-radius: 3px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 50; }
  .multiselect--above .multiselect__content-wrapper {
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 4px; }

.multiselect__content {
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 100%; }

.multiselect__element {
  position: relative; }
  .multiselect__element:not(:first-child) {
    border-top: 1px solid #ddd; }

.multiselect__option {
  position: relative;
  display: block;
  color: #555;
  padding: 8px;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer; }
  .multiselect__option--highlight {
    color: #555;
    background-color: #fafafa; }
  .multiselect__option--selected::before {
    content: "";
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    right: 1px;
    top: 1px;
    border-style: solid;
    border-width: 4px 4px 4px 4px;
    border-color: #4caf50 #4caf50 transparent transparent; }

.multiselect__spinner {
  position: absolute;
  display: block;
  right: 8px;
  top: 50%;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-right-color: transparent;
  border-top-color: transparent;
  -webkit-animation: spin-around 500ms infinite linear;
          animation: spin-around 500ms infinite linear;
  background-color: #fff; }



*[dir="rtl"] .multiselect {
  text-align: right;
}

*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}

*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0px 40px;
}

*[dir="rtl"] .multiselect__content {
  text-align: right;
}

*[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}

*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}

*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}

@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}

.multiselect{
 margin-bottom: 15px;
}
.multiselect__single{
 overflow: hidden
}
.bv-no-focus-ring{
  width:100%
}
</style>
