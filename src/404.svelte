<script>
  import { Page, Navbar, Block, Link, Button } from "framework7-svelte";
</script>

<Page>
  <Navbar title="Page Not Found" backLink="Back" />

  <div class="page-content" style="width: 100%; text-align: center;">
    <Link href="/Home">
      <img
        alt="404 Not Found"
        style="width: 100%; max-width: 500px"
        src="https://lh3.googleusercontent.com/pw/ACtC-3c0Pib7AWnog0z-1uM89GbMMJPavNveCKw_0VJqFC8VgftZoLFB7Ed44VQ45vznolvDN331Ui3EiTou31JgQi1KszxMQygWKax5tcqxZ16_sqVlrQR6YNDOET2i96dRH6WCUl63F1NTfbZA667g_QJ6MQ=s800" />
    </Link>
    <div style="margin-bottom: 40px; font-size: 1.2rem; font-weight: bold">
      ssss
      <Button style="margin: 40px" outline round href="/Home">sss</Button>
    </div>
  </div>
</Page>
