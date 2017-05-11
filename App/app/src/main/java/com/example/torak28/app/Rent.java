package com.example.torak28.app;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;


public class Rent extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    private Spinner spinner;
    private Spinner spinner2;

    String output;
    String output2;
    ArrayList<String> stacje;
    ArrayList<String> rowery;

    String id_stacji;
    String id_roweru;
    String UserName;
    BackgroundWorker BackgroundWorker = new BackgroundWorker(this);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rent);

        Bundle bundle = getIntent().getExtras();
        UserName = bundle.getString("UserName");

        spinner = (Spinner) findViewById(R.id.spinner);
        spinner2 = (Spinner)findViewById(R.id.spinner2);

        String type = "stacje";
        try {
            //Pobranie z netu JSONa w postaci stringa i sformatowanie go do postaci tablicy stingow
            //Na początku używałem jakiś bibliotek do ogarnięcia tego ale zajmowało to miljon razy więcej czasu
            //No i robiłem to w osobny AsyncTasku co nie pomaga wcale w "Niezawodności"
            //A to się całkiem sprawdza
            output = BackgroundWorker.execute(type, UserName).get();
            output = output.replace("id_stacji", "");
            output = output.replace("\"\"", "");
            output = output.replace("\"", "");
            output = output.replace("{", "");
            output = output.replace("}", "");
            output = output.replace("[", "");
            output = output.replace("]", "");
            output = output.replace(":", "");
            stacje = new ArrayList<String>(Arrays.asList(output.split(",")));
            ArrayAdapter adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, stacje);
            spinner.setAdapter(adapter);

            spinner.setOnItemSelectedListener(this);
            spinner2.setOnItemSelectedListener(this);
        }catch (Exception e){
            //nic
        }
    }

    //Po nacisnieciu przyciku Wypozycz
    public void Wypozycz(View view){
        //Klikniecie wypozyczenia. Wypisuje dla łatwiejszego debugowania
        System.out.print(id_stacji);
        System.out.print(id_roweru);
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        Spinner spinnerTest = (Spinner) parent;
        if(spinnerTest.getId() == R.id.spinner) {
            String selected = parent.getItemAtPosition(position).toString();
            id_stacji = selected;
            //Zapelniam 2 spinner jak pobiore info z 1
            try {
                //??
                BackgroundWorker BackgroundWorker2 = new BackgroundWorker(this);
                output2 = BackgroundWorker2.execute("rowery", id_stacji).get();
                output2 = output2.replace("id_stacji", "");
                output2 = output2.replace("\"\"", "");
                output2 = output2.replace("\"", "");
                output2 = output2.replace("{", "");
                output2 = output2.replace("}", "");
                output2 = output2.replace("[", "");
                output2 = output2.replace("]", "");
                output2 = output2.replace(":", "");
                rowery = new ArrayList<String>(Arrays.asList(output2.split(",")));
                ArrayAdapter adapter2 = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, rowery);
                spinner2.setAdapter(adapter2);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }else  if(spinnerTest.getId() == R.id.spinner2) {
            String selected = parent.getItemAtPosition(position).toString();
            id_roweru = selected;
        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
