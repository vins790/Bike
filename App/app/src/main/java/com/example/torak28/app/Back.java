package com.example.torak28.app;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Arrays;

public class Back extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    private Spinner spinner;
    private TextView textview;
    AlertDialog alertDialog;

    String output;
    String output2;
    String output3;
    ArrayList<String> stacje;
    ArrayList<String> rowery;

    String id_stacji;
    String id_roweru;
    String UserName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_back);

        BackgroundWorker backgroundWorker = new BackgroundWorker(this);

        Bundle bundle = getIntent().getExtras();
        UserName = bundle.getString("UserName");

        spinner = (Spinner) findViewById(R.id.spinner);
        textview = (TextView) findViewById(R.id.textView3);

        String type = "stacje";
        try {
            //Pobranie z netu JSONa w postaci stringa i sformatowanie go do postaci tablicy stingow
            //Na początku używałem jakiś bibliotek do ogarnięcia tego ale zajmowało to miljon razy więcej czasu
            //No i robiłem to w osobny AsyncTasku co nie pomaga wcale w "Niezawodności"
            //A to się całkiem sprawdza
            output = backgroundWorker.execute(type, UserName).get();
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
        }catch (Exception e){
            //nic
        }
    }
    //Po nacisnieciu przyciku Oddaj Rower
    public void Oddaj(View view){
        //ZAPYTANIE ODDANIA
        BackgroundWorker backgroundWorker = new BackgroundWorker(this);
        try {
            String id_roweru2 = id_roweru.substring(1,id_roweru.length());
            output3 = backgroundWorker.execute("back", UserName, id_roweru2, id_stacji).get();
            alertDialog = new AlertDialog.Builder(this).create();
            alertDialog.setTitle("Status");
            alertDialog.setMessage(output3);
            alertDialog.show();
            alertDialog.setOnCancelListener(new DialogInterface.OnCancelListener()
            {
                @Override
                public void onCancel(DialogInterface dialog)
                {
                    finish();
                }
            });
        }catch (Exception e){

        }
    }
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        Spinner spinnerTest = (Spinner) parent;
        if(spinnerTest.getId() == R.id.spinner) {
            String selected = parent.getItemAtPosition(position).toString();
            id_stacji = selected;
            //Zapelniam 2 spinner jak pobiore info z 1
            try {
                BackgroundWorker BackgroundWorker2 = new BackgroundWorker(this);
                //TERAZ LECIMY TUTAJ
                output2 = BackgroundWorker2.execute("oddaj", UserName).get();
                textview.setText(output2);
                id_roweru = output2;
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
