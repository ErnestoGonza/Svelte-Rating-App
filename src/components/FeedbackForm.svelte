<script lang='ts'>
  import {v4 as uuidv4} from 'uuid';
  import { FeedbackStore } from '../stores';
  import Card from './Card.svelte';
  import Button from './Button.svelte';
  import Rating from './RatingSelect.svelte';
  import { dataset_dev } from 'svelte/internal';

  let text: string = '';
  let rating: number = 10;
  let btnDisabled: boolean = true;
  let min: number = 10
  let message: string


  function handleInput() {
    if(text.trim().length <= min) {
      message = `Text must be at least ${min} characters`;
      btnDisabled = true;
    } else {
      message = null;
      btnDisabled = false;
    }
  }

  function handleSelect(e) {
    rating = e.detail;
  }

  function handleSubmit() {
    if(text.trim().length > min) {
      const newFeedback = {
        id: uuidv4(),
        text,
        rating: +rating,
      }
      FeedbackStore.update((currentFeedback) => {
        return [newFeedback, ...currentFeedback]
      })
      text = '';
    }
  }
</script>

<Card>
  <header>
    <h2>How would you rate your service with us?</h2>
  </header>
  <form on:submit|preventDefault= {handleSubmit}>
    <Rating on:rating-select={handleSelect}/>
    <div class="input-group">
      <input type="text" on:input={handleInput} bind:value= {text} placeholder="Tell us something that keeps you coming back!">
      <Button disabled={btnDisabled} type={'submit'}>Send</Button>
    </div>
    {#if message}
      <div class="message">
        {message}
      </div>
    {/if}
  </form>
</Card>

<style>
  header {
    max-width: 400px;
    margin: auto;
  }

  header h2 {
    text-align: center;
  }

  .input-group {
    border: 1px lightgray solid;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    padding: 5px 7px;
  }

  .input-group input {
    width: 83%;
    border: none;
  }
</style>