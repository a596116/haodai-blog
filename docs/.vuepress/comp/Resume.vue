<template>
  <div class="container">
    <section class="mes">
      <img src="/img/about/me.png" height="200" class="avatar" />
      <section class="content">
        <p>王教勛</p>
        <section class="info">
          <div class="line">
            <VIcon name="hi-solid-mail" class="icon" />
            <a href="mailto:a596116@gmail.com" target="_blank" rel="nofollow"
              >a596116@gmail.com</a
            >
          </div>
          <div class="line">
            <VIcon name="bi-phone-fill" class="icon" />
            <a href="tel:0988640301" target="_blank" rel="nofollow"
              >0988640301</a
            >
          </div>
          <div class="links">
            <a
              href="https://line.me/ti/p/YXi16BOO8V"
              target="_blank"
              rel="nofollow"
            >
              <VIcon name="bi-line" class="icon" height="30px" width="30px" />
            </a>
            <a href="https://github.com/a596116" target="_blank" rel="nofollow">
              <VIcon name="bi-github" class="icon" height="30px" width="30px" />
            </a>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.mes {
  width: 70%;
  display: flex;
  border: 1px solid var(--c-text);
  border-radius: 8px;
  .avatar {
    margin: 25px;
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      font-size: 2rem;
    }
    .info {
      display: flex;
      font-size: 1.5rem;
      flex-direction: column;
      line-height: 2;
      .line {
        display: flex;
        align-items: center;
        .icon {
          margin: 0 8px;
        }
      }
      .links {
        display: flex;
        justify-content: center;
        a {
          color: var(--c-text);
          margin: 0 10px;
        }
      }
    }
  }
}
@media (max-width: 419px) {
  .mes {
    justify-content: center;
    flex-wrap: wrap;
    .avatar {
      margin: 0px;
    }
    .content {
      .info {
        font-size: 1rem;
      }
    }
  }
}
</style>
