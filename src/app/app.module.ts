import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { UserdataService } from './services/userdata.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserdataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
